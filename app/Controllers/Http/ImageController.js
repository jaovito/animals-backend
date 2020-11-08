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
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
