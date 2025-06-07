import { collection, getDocs, addDoc } from "firebase/firestore";
import Database from "../Config/Firebase/Firebase.js"; 
const productsCollectionRef = collection(Database, "products"); 

const IMGBB_API_KEY = '155f01d87a8f5f4215424b1a3da6508a';
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload`;

export const getProductsService = async () => {
    try {
        const products_reference = collection(Database, "products");
        const response = await getDocs(products_reference)

        const data = response.docs.map((res) => {
            return{
                id: res.id,
                ... res.data()
            }
        })
        return data;

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return null;
    }
}


export const addProductService = async (formData) => {
    try {
        const productData = {};
        let imageFile = null;

        for (const [key, value] of formData.entries()) {
            if (key === 'imagen') {
                imageFile = value;
            } else if (key === 'detalles') {
                try {
                    productData[key] = JSON.parse(value);
                } catch (e) {
                    console.warn("Error parsing detalles JSON, saving as string:", e);
                    productData[key] = value;
                }
            } else if (key === 'precio' || key === 'porcentajeOferta' || key === 'cantidadDisponible') {
                productData[key] = parseFloat(value);
            } else {
                productData[key] = value;
            }
        }

        let imageUrl = null;
        if (imageFile) {
            const imgbbFormData = new FormData();
            imgbbFormData.append('key', IMGBB_API_KEY);
            imgbbFormData.append('image', imageFile);

            const imgbbResponse = await fetch(IMGBB_UPLOAD_URL, {
                method: 'POST',
                body: imgbbFormData,
            });

            if (!imgbbResponse.ok) {
                throw new Error("Fallo la subida de imagen a ImgBB");
            }

            const imgbbResult = await imgbbResponse.json();
            imageUrl = imgbbResult.data.url;
               
        }

        const firestoreProductData = {
            ...productData,
            imagen: imageUrl
        };

        const docRef = await addDoc(productsCollectionRef, firestoreProductData);
        console.log("Documento de producto agregado con ID:", docRef.id);
        return docRef.id;

    } catch (error) {
        console.error("Error en addProductService", error);
        throw error;
    }
};
