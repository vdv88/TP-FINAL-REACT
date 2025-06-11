import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import database from '../config/firebase'

export const getProducts = async () => {
  try {
    const obras_collection_reference = collection(database, 'obras')
    const result = await getDocs(obras_collection_reference)

    const obras_list_formatted = result.docs.map(document => ({
      id: document.id,
      ...document.data()
    }))

    return obras_list_formatted
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return null
  }
}


export const getProductById = async (product_id) => {
  try {
    const docRef = doc(database, 'obras', product_id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error al obtener producto por ID:', error)
    return null
  }
}

export const updateProductById = async (productId, updatedData) => {
  try {
    const obraRef = doc(database, 'obras', productId)
    await updateDoc(obraRef, updatedData)
    return true
  } catch (error) {
    console.error('Error al actualizar la obra:', error)
    return false
  }
}












// export const getProducts = async () =>{
//     try{
//         const response = await fetch(
//             'http://localhost:5173/api/products.json',
//             {
//                 method: 'GET'
//             }
//         )
//         const data = await response.json()
//         return data
//     }
//     catch(error){
//         console.error('Error al obtener productos:', error)
//         return null
//     }
// }

// export const getProductById = async ({product_id}) => {
//     const  products = await getProducts()
//     return products.find(product => product.id == product_id)

// }