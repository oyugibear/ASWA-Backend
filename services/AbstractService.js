class AbstractService {
    static async createDocument(Model, data) {
      const doc = await Model.create(data)
      return doc
    }
    static async getSingleDocument(Model, query) {
      const doc = await Model.findOne(query)
      return doc
    }
    static async getSingleDocumentById(Model, id, population) {
      const doc = await Model.findById(id)
      return doc 
      
    }
    static async getDocuments(Model) {
      const doc = await Model.find({})
      return doc
    }
    static async editDocument(Model, id, data) {
      const doc = await Model.findByIdAndUpdate(id, data, { new: true })
      return doc
    }
    static async editDocumentWithQuery(Model, query, data) {
      const doc = await Model.findOneAndUpdate(query, data, { new: true })
      return doc
    }
  }
  
  module.exports = AbstractService
  