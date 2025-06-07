import React, { useState } from 'react';
import { addProductService } from '../../Services/ProductServices.js'; 

/**
 * Componente NuevoProducto (Panel Lateral/Drawer) con formulario.
 * Permite subir una imagen en lugar de ingresar una URL.
 *
 * @param {object} props - Las props del componente.
 * @param {boolean} isOpen - Booleano que indica si el drawer está abierto.
 * @param {function} onClose - Función a llamar cuando el drawer se debe cerrar.
 * @param {function} onProductAdded - Función a llamar después de que un producto se agrega exitosamente.
 * @param {'left'|'right'} [side='right'] - Lado desde el cual se abre el drawer ('left' o 'right').
 */
function NuevoProducto({ isOpen, onClose, onProductAdded, side = 'right' }) {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        porcentajeOferta: '',
        cantidadDisponible: '',
        detalles: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const drawerClasses = `
        fixed top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${side === 'right' ? 'right-0' : 'left-0'}
        ${isOpen ? 'translate-x-0' : (side === 'right' ? 'translate-x-full' : '-translate-x-full')}
    `;

    const overlayClasses = `
        fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out
        ${isOpen ? 'opacity-20 visible' : 'opacity-0 invisible'}
    `;

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagen") {    
            const file = files[0];
            if (file) {
                setSelectedFile(file); 
                setSaveError(null);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result); 
                };
                reader.readAsDataURL(file); 
            } else {
                setSelectedFile(null);
                setImagePreviewUrl(null);
            }
        } else {
           setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError(null);

        if (!formData.nombre || !selectedFile || !formData.precio || !formData.cantidadDisponible) {
            setSaveError("Por favor, rellena todos los campos obligatorios.");
            setIsSaving(false);
            return;
        }

        const formDataToUpload = new FormData();
        formDataToUpload.append('nombre', formData.nombre);
        formDataToUpload.append('precio', parseFloat(formData.precio));
        formDataToUpload.append('porcentajeOferta', parseFloat(formData.porcentajeOferta || 0));
        formDataToUpload.append('cantidadDisponible', parseInt(formData.cantidadDisponible));
        formDataToUpload.append('detalles', JSON.stringify([]));

        if (selectedFile) {
            formDataToUpload.append('imagen', selectedFile); 
        }

        try {
            const addedProductId = await addProductService(formDataToUpload);
            if (addedProductId) {
                console.log("Producto agregado con ID:", addedProductId);
                setFormData({
                    nombre: '',
                    precio: '',
                    porcentajeOferta: '',
                    cantidadDisponible: '',
                    detalles: ''
                });
                setSelectedFile(null);
                setImagePreviewUrl(null);

                onClose(); 
                if (onProductAdded) {
                    onProductAdded(); 
                }
            } else {
                throw new Error("No se pudo obtener el ID del producto agregado.");
            }
        } catch (err) {
            console.error("Error al agregar producto:", err);
            setSaveError(err.message || "Error desconocido al guardar el producto.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={overlayClasses} onClick={onClose}></div>

            <div className={drawerClasses}>
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Nuevo Producto</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl leading-none"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-auto">
                    {saveError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{saveError}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Ej. Apple Watch Series 9"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
                                Subir Imagen
                            </label>
                            <input
                                type="file"
                                id="imagen"
                                name="imagen"
                                onChange={handleChange}
                                accept="image/*"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm file:bg-blue-50 file:border-0 file:border-r file:border-solid file:border-gray-300 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
                                required
                            />
                            {imagePreviewUrl && (
                                <div className="mt-2">
                                <p className="text-sm text-gray-500">Previsualización:</p>
                                <img
                                    src={imagePreviewUrl}
                                    alt="Previsualización de la imagen"
                                    className="mt-1 max-w-full h-auto rounded-md shadow"
                                />
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio Original ($)</label>
                            <input
                                type="number"
                                id="precio"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="999.99"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="porcentajeOferta" className="block text-sm font-medium text-gray-700">Porcentaje de Oferta (%)</label>
                            <input
                                type="number"
                                id="porcentajeOferta"
                                name="porcentajeOferta"
                                value={formData.porcentajeOferta}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="10"
                                min="0"
                                max="100"
                            />
                        </div>

                        <div>
                            <label htmlFor="cantidadDisponible" className="block text-sm font-medium text-gray-700">Cantidad Disponible</label>
                            <input
                                type="number"
                                id="cantidadDisponible"
                                name="cantidadDisponible"
                                value={formData.cantidadDisponible}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="50"
                                min="0"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`w-full rounded-lg bg-slate-900 py-2 px-4 text-center text-sm font-medium text-white transition-colors
                                ${isSaving ? 'bg-slate-500 cursor-not-allowed' : 'hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer'}
                            `}
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Producto'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NuevoProducto;