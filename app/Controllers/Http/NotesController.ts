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

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const note = await Note.query()
      .where({ id: id })
      .firstOrFail()

    return response.json({
      data: {
        note: note
      }
    })
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ params, request, response }: HttpContextContract) {
    //mengambil params
    const { id } = params

    //mengambil data dari body
    const { title, content } = request.body()

    //get data dari note
    const note = await Note.query()
      .where({ id: id })
      .firstOrFail()

    //update data query cara (1)
    // note.merge({
    //   title: title,
    //   content: content
    // }).save()

    //update data query cara (2)
    note.title = title
    note.content = content
    note.save()

    //update data query cara (3)
    // await Note.query()
    //   .where({ id: id })
    //   .update({
    //     title: title,
    //     content: content
    //   })

    return response.json({
      message: "data berhasil diupdate"
    })

  }

  public async destroy({ params, response }: HttpContextContract) {
    //mengambil params
    const { id } = params

    //get data dari note
    const note = await Note.query()
      .where({ id: id })
      .firstOrFail()

    //delete data query
    await note.delete()

    return response.json({
      message: "data berhasil dihapus"
    })


  }
}
