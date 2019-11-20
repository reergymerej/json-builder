import { takeEvery, delay, all } from 'redux-saga/effects'

import { INCREMENT, DECREMENT } from './actions'

function* increment() {
  yield delay(1000)
  console.log('incrementalicious')
}

function* decrement() {
  yield delay(1333)
  console.log('so decrementy')
}

export default function* rootSaga() {
  yield all([
    takeEvery(INCREMENT, increment),
    takeEvery(DECREMENT, decrement),
  ])
}
