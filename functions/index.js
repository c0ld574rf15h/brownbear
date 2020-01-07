const functions = require('firebase-functions')
const admin = require('firebase-admin')
const sha256 = require('js-sha256').sha256;
admin.initializeApp()

const cors = require('cors')({origin: true});

exports.checkFlag = functions.https.onCall(data => {
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

exports.newSolve = functions.https.onCall(data => {
  const ref = admin.firestore().collection('challenges').doc(data.chall_id)
  return ref.update({
    solvers: admin.firestore.FieldValue.increment(1)
  }).then(() => {
    admin.firestore().collection('users').doc(data.user_handle).update({
      points: admin.firestore.FieldValue.increment(data.chall_point)
    })
  })
})

exports.addSolver = functions.https.onCall(data => {
  const ref = admin.firestore().collection('solved').doc(data.doc_id)
  return ref.get().then(doc => {
    if(doc.exists) {
      return { malicious: true }
    } else {
      ref.set({
        user: data.user_id,
        chall: data.chall_id
      }).then(() => {
        console.log('Add Solver Success')
      }).catch(err => {
        console.log(err)
      })
    }
  })
})