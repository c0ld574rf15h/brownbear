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

exports.newSolve = functions.region('asia-northeast1').https.onCall(data => {
  let status = "success"
  let points = 0

  admin.firestore().collection('solved').where("user","==",data.user_handle).get().then(docs => {
    if (!docs.empty) {
      let length = docs._size
      let cnt = 0;
      docs.forEach(doc => {
        cnt++
        admin.firestore().collection('challenges').doc(doc.data().chall).get()
        .then(solvedChall => {
          points += solvedChall.data().points
          if (cnt == length) {
            admin.firestore().collection('users').doc(data.user_handle).update({
              points: points
            })
          }
        })
      })
    }
  }).catch(err => {console.log(err); status="error"})

  admin.firestore().collection('solved').where("chall","==",data.chall_id)
  .get()
  .then(docs => {
    let solvers_num = docs._size - 1
    if (docs.empty) {
      solvers_num = 0
    } 
    else {
      admin.firestore().collection('challenges').doc(data.chall_id).update({
        solvers: solvers_num+1
      })
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