import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index({ response }: HttpContextContract) {
    const notes = await Database.from('notes')
    return response.json({
      data: {
        notes: notes
      }
    })
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {
    const { title, content } = request.body()
    await Note.create({
      title: title,
      content: content
    })
    return response.json({
      message: "data berhasil ditambahkan"
    })

  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
