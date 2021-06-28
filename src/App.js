import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import Web3 from 'web3'
import { Abi, Address } from "./Abi"

function App() {

  const [usuarios, setUsuarios] = useState([])
  const [valor, setValor] = useState()
  const [value, setValue] = useState()
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState()
  const [user, setUser] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    getUsuarios()
  }, []);

  const getUsuarios = async () => {
    const temp = [];
    const snapshot = await firebase.firestore().collection('Usuario').get();
    snapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id })
    });

    setUsuarios(temp)
  }

  const getInput = async (event) => {
    event.preventDefault()

    if (valor == null) {
      alert("Debe de ingresar primero la cantidad de watts que desee antes de proceder")
    } else if (valor <= 0) {
      alert("La cantidad solo puede ser mayor a 0")
    } else if (valor > cantidad) {
      alert("La cantidad seleccionada es mayor a la que esta disponible")
    } else {
      const total = valor * value
      await alert("Total seria de $" + total)
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
      const accounts = await web3.eth.getAccounts()
      const prueba = new web3.eth.Contract(Abi, Address)
      await prueba.methods.set(total, nombre, accounts[0], user).send({ from: accounts[0] }).once('receipt', (receipt) => { })

      await firebase.firestore().collection("Usuario").doc(id).set({
        Nombre: nombre,
        address: user,
        cantidad: cantidad - total,
        valor: value
      }).then(() => {
      }).catch(() => {
      })

      window.location.reload()
    }
  }


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

  const getInfo = async (event) => {
    event.preventDefault()
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const prueba = new web3.eth.Contract(Abi, Address)
    const a = await prueba.methods.getCuenta1().call()
    const b = await prueba.methods.getCuenta2().call()
    const c = await prueba.methods.getNombre().call()
    const d = await prueba.methods.getCantidad().call()

    console.log("From: " + a)
    console.log("To: " + b)
    console.log("Nombre: " + c)
    console.log("Total: " + d)
  }

  return (
    <>

      <div class="bg-gradient-to-tl from-white to-gray-200 text-white font-mono flex flex-col min-h-screen">
        <div class="flex flex-row-reverse flex-wrap m-auto">


          {
            usuarios.map((doc) => {
              return (
                <div class="">
                  <div class="flex w-full justify-between">
                    <div class="relative w-96 rounded-2xl shadow-lg overflow-hidden mr-8">
                      <div class="flex flex-col">
                        <header class="flex justify-between p-4 text-white z-20">
                          <span class="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </span>
                          <div class="relative text-gray-600 focus-within:text-gray-400">
                            <input type="number" class="py-2 text-sm text-white bg-gray-600 rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Watts" autocomplete="off" onChange={event => {
                              setNombre(doc.Nombre)
                              setValor(event.target.value)
                              setCantidad(doc.cantidad)
                              setValue(doc.valor)
                              setUser(doc.address)
                              setId(doc.id)
                            }} />
                          </div>
                        </header>
                        <div class="flex justify-between px-4 text-gray-100 z-30 mb-4">
                          <div class="flex flex-col items-start">
                            <span class="font-thin">Nombre</span>
                            <span class="tracking-widest text-xl">{doc.Nombre}</span>
                          </div>
                          <div class="flex flex-col items-end">
                            <span class="font-thin">Cantidad Disponible</span>
                            <span class="tracking-widest text-xl">{doc.cantidad} Watts</span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between px-4 h-16 z-30 text-white bg-indigo-700">
                          <div class="flex flex-col items-start">
                            <span class="text-2xl">${doc.valor}/Watts</span>
                          </div>
                          <div class="flex flex-col items-center">
                            <div class="relative flex">
                              <button onClick={getInput} class="rounded px-2 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-indigo-800 border-indigo-900 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          class="absolute opacity-90 top-0 left-0 h-full blur w-full bg-gradient-to-t from-blue-700 to-indigo-400 rounded-2xl">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
        <button onClick={getInfo} class="rounded px-2 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-indigo-800 border-indigo-900 text-white">
          Get Blockchain
        </button>
      </div>
    </>
  );
}

export default App;
