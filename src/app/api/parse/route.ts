// src/app/api/parse/route.ts
import { Job } from '@/entities/job/ui/JobCard'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://devkg.com'
const LIST_URL = 'https://devkg.com/ru/jobs'

function decodeCfEmail(encodedString: string): string {
  const hex = encodedString
  let email = ''
  const key = parseInt(hex.slice(0, 2), 16)
  for (let i = 2; i < hex.length; i += 2) {
    email += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key)
  }
  return email
}

export async function GET() {
  try {
    const { data: listHtml } = await axios.get(LIST_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })

    const $ = cheerio.load(listHtml)

    const links: string[] = []
    $('article.item a.link').each((_, el) => {
      const href = $(el).attr('href')
      if (href) links.push(BASE_URL + href)
    })

    const filePath = path.join(process.cwd(), 'src/shared/api/mock/parsed_jobs.json')

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, '[]')
    }

    let existingJobs: Job[] = []
    const raw = fs.readFileSync(filePath, 'utf-8').trim()
    if (raw) {
      try {
        existingJobs = JSON.parse(raw)
      } catch {
        existingJobs = []
      }
    }

    const existingSlugs = new Set(existingJobs.map((j) => j.source_url))

    const newJobs: Job[] = []

    for (const url of links) {
      if (existingSlugs.has(url)) break

      let jobHtml = ''
      try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
        jobHtml = res.data
      } catch {
        console.warn(`Не удалось загрузить: ${url}`)
        continue
      }

      const $j = cheerio.load(jobHtml)

      const textWithoutLabel = (selector: string): string => {
        const el = $j(selector).first()
        if (!el.length) return ''
        return el.clone().find('.label').remove().end().text().trim()
      }

      // TITLE
      const title = $j('h1').first().text().trim()

      // COMPANY — ищем через лейбл "компания" или strong внутри .company
      let company =
        $j('.information .company strong').first().text().trim() ||
        textWithoutLabel('.organizations-item-field.name') ||
        ''

      if (!company) {
        $j('.information > div, .job .information > div').each((_, el) => {
          const label = $j(el).find('.label').text().toLowerCase().trim()
          if (label === 'компания') {
            company = $j(el).find('strong').text().trim()
          }
        })
      }

      // SALARY
      const salary =
        textWithoutLabel('.information .price') ||
        textWithoutLabel('.job .price') ||
        textWithoutLabel('.price') ||
        ''
      // TYPE + COUNTRY
      const rawType =
        $j('.information .type strong').first().text().trim() ||
        textWithoutLabel('.information .type') ||
        textWithoutLabel('.type') ||
        ''

      let type = ''
      let country = ''

      if (rawType.includes('/')) {
        const parts = rawType.split('/')
        type = parts[0].trim()
        country = parts[1].trim()
      } else {
        type = rawType.trim()
        country = ''
      }

      // LOGO
      const logo =
        $j('.organizations-item-field.icon img').attr('src') ||
        $j('.organization .fields .icon img').attr('src') ||
        $j('.company-icon .image img').attr('src') ||
        null

      // DESCRIPTION
      const description =
        $j('.job-body').html()?.trim() ||
        $j('.information .text').html()?.trim() ||
        ''

      // CONTACTS
      const contacts: { telegram?: string; phone?: string; email?: string } = {}

      $j('.job .information > div, .information > div').each((_, el) => {
        const label = $j(el).find('.label').text().toLowerCase().trim()
        if (!label) return

        if (label.includes('telegram')) {
          contacts.telegram = $j(el).find('a').text().trim()
        }

        if (label.includes('телефон') || label.includes('phone')) {
          const href = $j(el).find('a').attr('href') || ''
          contacts.phone =
            $j(el).find('a').text().trim() || href.replace('tel:', '').trim()
        }

        if (
          label.includes('e-mail') ||
          label.includes('email') ||
          label.includes('почта')
        ) {
          const cfEmail = $j(el).find('[data-cfemail]').attr('data-cfemail')
          if (cfEmail) {
            contacts.email = decodeCfEmail(cfEmail)
          } else {
            const href = $j(el).find('a').attr('href') || ''
            contacts.email =
              href.replace('mailto:', '').trim() || $j(el).find('a').text().trim()
          }
        }
      })

      newJobs.push({
        id: crypto.randomUUID(),
        title,
        company,
        salary,
        type,
        country,
        logo,
        description,
        contacts,
        source_url: url,
        parsed_at: new Date().toISOString(),
        created_at: '',
      })

      await new Promise((r) => setTimeout(r, 300))
    }

    const allJobs = [...newJobs, ...existingJobs]
    fs.writeFileSync(filePath, JSON.stringify(allJobs, null, 2))

    return Response.json({ success: true, added: newJobs.length, total: allJobs.length })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}

