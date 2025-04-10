import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import EditorCanvas from "./components/EditorCanvas";
import "./App.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Image Caption & Shape Editor
        </h1>
        {!selectedImage ? (
          <>
            <SearchBar setImages={setImages} />
            <ImageGallery images={images} onSelect={setSelectedImage} />
          </>
        ) : (
          <EditorCanvas
            imageUrl={selectedImage}
            onBack={() => setSelectedImage(null)}
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
