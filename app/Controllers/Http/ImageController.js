'use strict'

const Image = use('App/Models/Image')
const Animal = use('App/Models/Animal')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ params, response }) {
    const animal = await Animal.findOrFail(params.id)

    await request.multipart.file('image', {
      types: ['image'],
      size: '2mb'
    }, async(file) => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const Key = `${(Math.random() * 100).toString(32)}-${file.clientName}`

        const url = await Drive.put(Key, file.stream, {
          ContentType,
          ACL,
        })

        await Image.create({
          animal_id: animal.id,
          path: file.clientName,
          key: Key,
          url,
          content_type: ContentType
        })

      } catch (err) {
        return response.status(401).send({
          error: {
            message: 'Não foi possível enviar o arquivo',
            err_message: err.message
          }
        })
      }
    }).process()
  }
}

module.exports = ImageController
