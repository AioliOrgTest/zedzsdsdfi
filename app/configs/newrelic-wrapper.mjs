import nr from 'newrelic'
import logger from './winston.mjs'

export async function startBackgroundTx(txName, fn, ...params) {
  try {
    let error
    const promise1 = new Promise((resolve, reject) => {
      nr.startBackgroundTransaction(txName, async () => {
        const transaction = nr.getTransaction()
        let result
        try {
          result = await fn(...params)
        } catch (e) {
          logger.error(`Error calling ${fn} : ${e}`)
          await reportError(e, {
            txName: txName,
          })
          error = e
        } finally {
          transaction.end()
          if (error){
            reject(error)
          } else {
            resolve(result)
          }
        }
      })
    })
    return await promise1
  } catch (ex) {
    logger.error(`Error in nr.startBackgroundTransaction : ${ex}`)
    throw ex
  }
}

// https://docs.newrelic.com/docs/browser/new-relic-browser/browser-agent-spa-api/notice-error
export async function reportError(error, paramsJson) {
  try {
    nr.noticeError(error, paramsJson)
  } catch (e) {
    logger.error(`Error in nr.noticeError : ${e}`)
  }
}

export function recordMetrics(myClass, myMethod, count) {
  try {
    nr.recordMetric(`${myClass}/${myMethod}`, count)
  } catch (error) {
    logger.error(`Error in nr.recordMetric : ${error}`)
  }
}