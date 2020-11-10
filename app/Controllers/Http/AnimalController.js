'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Animal = use('App/Models/Animal');
const Drive = use('Drive')
const Image = use('App/Models/Image')
/**
 * Resourceful controller for interacting with animals
 */
const Helpers = use('Helpers')

class AnimalController {
  /**
   * Show a list of all animals.
   * GET animals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const animal = await Animal.query()
      .with('images')
      .fetch()

    return animal
  }

  /**
   * Create/save a new animal.
   * POST animals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only([
      'name',
      'description',
      'reason_adoption',
      'breed',
      'citie',
      'contact'
    ])

    const {user} = auth

    const animal = await Animal.create({user_id: user.id, ...data})

    return animal
  }

  /**
   * Display a single animal.
   * GET animals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const animal = await Animal.findOrFail(params.id)

    await animal.load('images')

    return animal
  }

  /**
   * Delete a animal with id.
   * DELETE animals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    const animal = await Animal.findOrFail(params.id)

    if (animal.id !== auth.user.id) {
      return response.status(401).send()
    }

    await animal.delete()
  }
}

module.exports = AnimalController
