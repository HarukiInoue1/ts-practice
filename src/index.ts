// // 同期
// console.log("A: 注文する")

// console.log("B: ラーメン完成！")

// console.log("C: 水を飲む") //→ラーメン完成するまでに水を飲みたい、でも同期処理だとラーメン完成まで待たないといけない

// // 非同期
// console.log("A: 注文する")

// setTimeout(() => {
//   console.log("B: ラーメン完成！")
// }, 2000)

// console.log("C: 水を飲む")

// Promiseオブジェクト作成 → 非同期の結果をラップする箱
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("エラー") //resolve または reject は どちらか一度だけしか効かない →Promiseはpendingから状態が変わったら確定(settled)されるから
    resolve("成功")
  }, 1000)
})

// console.log(promise) //  Promiseの状態 <pending> 1秒間

// // A: Promiseのthen/catch

// // Resolveされた結果　1秒後 resolveでfulfilledになったらthenチェーン　失敗になったらcatchでエラー表示　resolveの結果関係なく処理の最終結果
// promise
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error))
//   .finally(() => console.log("処理終了"))

// B: async/awaitで同じことをやる
// async関数は、常にPromiseを返す関数　→　Promiseはthenチェーンで繋いでいくと長く読みにくくなるから
async function asyncExample() {
  try {
    const result = await promise //awaitはPromiseがresolveされるのを待つ構文
    console.log(result) //エラーが出たら実行されない
  } catch (err) {
    console.log(err) //rejectされた場合はcatchにいく
  } finally {
    console.log("終了")
  }
}

asyncExample()

// async function makeRamen() {
//   console.log("A: 注文する")

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("B: ラーメン完成！")
//       // reject("B: ラーメン失敗")
//     }, 1000)
//   })

//   console.log("C: 水を飲む")

//   try {
//     const result = await promise
//     console.log(result)
//   } catch (err) {
//     console.log("エラー:", err)
//   } finally {
//     console.log("D: 食事終了")
//   }
// }

// makeRamen()

// function axiosGet(url: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.open("GET", url)

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(xhr.responseText) // ✅ 通信成功したら resolve！
//       } else {
//         reject(new Error("通信エラー")) // ❌ ステータスコードがエラーなら reject！
//       }
//     }

//     xhr.onerror = () => reject(new Error("ネットワークエラー"))

//     xhr.send()
//   })
// }
