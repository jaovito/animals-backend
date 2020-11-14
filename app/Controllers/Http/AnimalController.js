'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Animal = use('App/Models/Animal');
/**
 * Resourceful controller for interacting with animals
 */
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
    .where('citie', auth.user.city)
    .where('adopted', false)
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

  async update ({ params, request, response, auth }) {
    const animal = await Animal.findOrFail(params.id)
    
    const {adopted} = request.all()

    if (animal.id !== auth.user.id) {
      return response.status(401).send()
    }

    animal.adopted = adopted

    await animal.save()
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

    if (animal.id !== auth.user.id || animal.adopted === true) {
      return response.status(401).send()
    }

    await animal.delete()
  }
}

module.exports = AnimalController
