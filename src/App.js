import React from 'react'
import firebase from './firebase'
import Web3 from 'web3'
import { Abi, Address } from "./Abi"

function App() {

  const ref = firebase.firestore().collection("test").get();
  ref.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });


  const Info = async (event) => {
    event.preventDefault()
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const accounts = await web3.eth.getAccounts()
    const prueba = new web3.eth.Contract(Abi, Address)

    await prueba.methods.set(14).send({ from: accounts[0] }).once('receipt', (receipt) => { })

    /*
    await web3.eth.sendTransaction({
      from: "0x0cF92120827DE2eed82B70309Ed3d5197A457f33",
      to: "0x27dB580e4b9C0466589772FAbA68e00De75B0dC0",
      value: "200000",
    }, function (err, transactionHash) {
      if (err) {
        console.log(err);
      } else {
        console.log(transactionHash);
      }
    });
    */
  }

  const getInfo = async (event) => {
    event.preventDefault()
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const prueba = new web3.eth.Contract(Abi, Address)
    const getInfo = await prueba.methods.get().call()
    console.log(getInfo)
  }

  return (
    <div class="bg-gradient-to-tl from-blue-800 to-blue-500 text-white font-mono flex flex-col min-h-screen">
      <div class="flex flex-row-reverse flex-wrap m-auto">
        <button onClick={getInfo} class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-800 border-blue-900 text-white">
          Get
        </button>
        <button onClick={Info} class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-800 border-blue-900 text-white">
          Set
        </button>
      </div>
    </div>
  );
}

export default App;
