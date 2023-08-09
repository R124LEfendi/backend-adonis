import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Note from 'App/Models/Note'

export default class extends BaseSeeder {
  public async run() {
    //delete existing data
    await Note.query().delete()
    //insert new data
    await Note.create({
      title: "sekolah",
      content: "saya sekolah di smk taruna bhakti"
    })

    for (let index = 0; index < 7; index++) {
      await Note.create({
        title: `hobi ${index + 1}`,
        content: `saya suka bermain game ${index + 1}`
      })

    }


  }
}
