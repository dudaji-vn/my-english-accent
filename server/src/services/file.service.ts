import { injectable } from 'tsyringe'
import fs from 'fs'
import * as fastCsv from 'fast-csv'
import DictionaryModel from '../entities/Dictionary'

@injectable()
export default class FileService {
  private async parseCsvRow(row: string[], category: string) {
    const [
      wordOrExpression,
      textKorean,
      textVietNam,
      example,
      exampleVI,
      exampleKR,
      wordType
    ] = row

    if (
      wordOrExpression &&
      textKorean &&
      textVietNam &&
      example &&
      exampleVI &&
      exampleKR &&
      wordType &&
      wordOrExpression !== 'word/expression'
    ) {
      return {
        wordOrExpression,
        textKorean,
        textVietNam,
        example,
        exampleVI,
        exampleKR,
        wordType,
        category
      }
    }
    return null
  }

  private async processCsvFile(source: string, category: string) {
    const stream = fs.createReadStream(source)
    const parser = fastCsv.parseStream(stream)
    const listItems: any[] = []

    parser.on('data', async (row: string[]) => {
      const parsedRow = await this.parseCsvRow(row, category)
      if (parsedRow) {
        listItems.push(parsedRow)
      }
    })

    await new Promise((resolve) => {
      parser.on('end', resolve)
    })

    return listItems
  }

  private async insertDataIntoDatabase(data: any[]) {
    try {
      const result = await DictionaryModel.insertMany(data)
      console.log('Documents inserted:', result)
    } catch (err) {
      console.error('Error inserting documents:', err)
    }
  }

  async syncDataFromExcel() {
    await DictionaryModel.deleteMany()
    await this.handleStoreFile(
      './resource/MEA-Voca-General.csv',
      'general'
    )
    await this.handleStoreFile(
      './resource/MEA-Voca-Designer.csv',
      'designer'
    )
    await this.handleStoreFile(
      './resource/MEA-Voca-Developer.csv',
      'developer'
    )
    return 'sync data'
  }

  private async handleStoreFile(source: string, category: string) {
    const generalData = await this.processCsvFile(source, category)
    await this.insertDataIntoDatabase(generalData)
  }
}
