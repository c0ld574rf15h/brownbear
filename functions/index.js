const functions = require('firebase-functions')
const admin = require('firebase-admin')
const sha256 = require('js-sha256').sha256;

const cors = require('cors')({origin: true});

var serviceAccount = require('./brownbear-db9f1-firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://brownbear-db9f1.firebaseio.com'
});

exports.checkFlag = functions.region('asia-northeast1').https.onCall(data => {
  const ref = admin.firestore().collection('challenges').doc(data.chall_id)
  return ref.get().then(snapshot => {
    if(!snapshot.exists) {
      return { correct: false }
    } else {
      const real_flag = snapshot._fieldsProto.flag.stringValue
      if(real_flag == sha256(data.flag)) {
        return { correct: true }
      } else {
        return { correct: false }
      }
    }
  })
})

exports.updateAll = functions.region('asia-northeast1').https.onCall(() => {
  let status = "success"

  const getPoints = (user_handle) => {
    return new Promise(async (res, rej) => {
      let challtitiles = []
      let points = 0
      await admin.firestore().collection('solved').where("user","==",user_handle).get().then(docs => {
        if(!docs.empty) {
          docs.forEach(doc => {
            challtitiles.push(doc.data().chall)
          })
        }
      }).catch(err => {rej(err)})
      for (let cnt = 0; cnt < challtitiles.length; cnt++) {
        await admin.firestore().collection('challenges').doc(challtitiles[cnt]).get()
        .then(solvedChall => {
          points += solvedChall.data().points
          console.log(points, cnt, challtitiles.length)
          if(cnt == challtitiles.length-1) res(points)
        }).catch(err => {rej(err)})
      }
    })
  }

  const getUsers = () => {
    return new Promise(async (res, rej) => {
      let users = []
      await admin.firestore().collection('users').get().then(docs => {
        docs.forEach(doc => {
          console.log(doc.data())
          users.push(doc.data().handle)
        })
      }).catch(err => {rej(err)})
      res(users)
    })
  }

  const getChalls = () => {
    return new Promise(async (res, rej) => {
      let users = []
      await admin.firestore().collection('challenges').get().then(docs => {
        docs.forEach(doc => {
          console.log(doc.data())
          users.push(doc.data().title)
        })
      }).catch(err => {rej(err)})
      res(users)
    })
  }

  getUsers().then(users => {
    users.forEach(user_handle => {
      getPoints(user_handle).then(points => {
        admin.firestore().collection('users').doc(user_handle).update({
          points: points
        })
      }).catch(err => {console.log(err); status="error"})
    })
  }).catch(err => {console.log(err); status="error"})

  getChalls().then(challs => {
    challs.forEach(chall => {
      admin.firestore().collection('solved').where("chall","==",chall).get()
      .then(docs => {
        let solvers_num = docs._size
        if (docs.empty) {
          solvers_num = 0
        } 
        else {
          admin.firestore().collection('challenges').doc(chall).update({
            solvers: solvers_num
          }).catch(err => {console.log(err); status="error"})
        }
      }).catch(err => {console.log(err); status="error"})
    })
  })


  return { status: status}
})

exports.updateSolve = functions.region('asia-northeast1').https.onCall(data => {
  let status = "success"

  const getPoints = () => {
    return new Promise(async (res, rej) => {
      let challtitiles = []
      let points = 0
      await admin.firestore().collection('solved').where("user","==",data.user_handle).get().then(docs => {
        if(!docs.empty) {
          docs.forEach(doc => {
            challtitiles.push(doc.data().chall)
          })
        }
      }).catch(err => {rej(err)})
      for (let cnt = 0; cnt < challtitiles.length; cnt++) {
        await admin.firestore().collection('challenges').doc(challtitiles[cnt]).get()
        .then(solvedChall => {
          points += solvedChall.data().points
          console.log(points, cnt, challtitiles.length)
          if(cnt == challtitiles.length-1) res(points)
        }).catch(err => {rej(err)})
      }
    })
  }

  getPoints().then(points => {
    admin.firestore().collection('users').doc(data.user_handle).update({
      points: points
    })
  }).catch(err => {console.log(err); status="error"})

  admin.firestore().collection('solved').where("chall","==",data.chall_id).get()
  .then(docs => {
    let solvers_num = docs._size
    if (docs.empty) {
      solvers_num = 0
    } 
    else {
      admin.firestore().collection('challenges').doc(data.chall_id).update({
        solvers: solvers_num
      }).catch(err => {console.log(err); status="error"})
    }
  }).catch(err => {console.log(err); status="error"})

  return { status: status }
})

exports.addSolver = functions.region('asia-northeast1').https.onCall(data => {
  const ref = admin.firestore().collection('solved').doc(data.doc_id)
  return ref.get().then(doc => {
    if(doc.exists) {
      return {
        malicious: true
      }
    } else {
      ref.set({
        user: data.user_handle,
        chall: data.chall_id
      })
    }
  })
})

exports.isAdmin = functions.region('asia-northeast1').https.onCall(data => {
  const ref = admin.firestore().collection('users').where("user_id", "==", data.uid)
  return ref.get().then(snapshot => {
    const user = snapshot.docs[0].data()
    if(user.isAdmin) {
      return { res: true }
    } else {
      return { res: false }
    }
  })
})