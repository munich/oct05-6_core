const Controller = require('./controller')

class WalletsController extends Controller {
  index (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.paginate(this.pager).then(wallets => {
        super.respondWithPagination(wallets, 'wallet')
      })
    })
  }

  show (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.findById(req.params.id).then(wallet => {
        super.respondWithResource(wallet, 'wallet')
      })
    })
  }

  transactions (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.findById(req.params.id).then(wallet => {
        db.transactions.paginateAllByWallet(wallet, this.pager).then(transactions => {
          super.respondWithPagination(transactions, 'transaction')
        })
      })
    })
  }

  transactionsSend (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.findById(req.params.id).then(wallet => {
        db.transactions.paginateAllBySender(wallet.publicKey, this.pager).then(transactions => {
          super.respondWithPagination(transactions, 'transaction')
        })
      })
    })
  }

  transactionsReceived (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.findById(req.params.id).then(wallet => {
        db.transactions.paginateAllByRecipient(wallet.address, this.pager).then(transactions => {
          super.respondWithPagination(transactions, 'transaction')
        })
      })
    })
  }

  votes (req, res, next) {
    super.init(req, res, next).then(db => {
      db.accounts.findById(req.params.id).then(wallet => {
        db.transactions.paginateVotesBySender(wallet.publicKey, this.pager).then(transactions => {
          super.respondWithPagination(transactions, 'transaction')
        })
      })
    })
  }
}

module.exports = new WalletsController()