import React, { useEffect, useRef, useState } from "react";

const EditorCanvas = ({ imageUrl, onBack }) => {
  const canvasElRef = useRef(null);
  const canvasRef = useRef(null);
  const [shapeColors, setShapeColors] = useState({
    circle: "#000",
    rect: "#000",
    triangle: "#000",
    text: "#000",
  });
  const handleColorChange = (type, color) => {
    setShapeColors((prev) => ({
      ...prev,
      [type]: color,
    }));
  };

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 600,
      height: 400,
      backgroundColor: "#fff",
    });
    canvasRef.current = canvas;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.scaleToWidth(600);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      },
      { crossOrigin: "anonymous" }
    );

    return () => canvas.dispose();
  }, [imageUrl]);

  const addText = () => {
    const text = new fabric.IText("Your Text", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: shapeColors.text,
      cornerStyle: "circle",
      cornerColor: "white",
      padding: 20,
      borderColor: "white",
    });
    canvasRef.current.add(text);
  };

  const addShape = (type) => {
    const color = shapeColors[type];
    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: color,
          left: 150,
          top: 150,
          cornerStyle: "circle",
          cornerColor: "white",
          padding: 20,
          borderColor: "white",
        });
        break;
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: color,
          left: 150,
          top: 150,
          cornerStyle: "circle",
          cornerColor: "white",
          padding: 20,
          borderColor: "white",
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: color,
          left: 150,
          top: 150,
          cornerStyle: "circle",
          cornerColor: "white",
          padding: 20,
          borderColor: "white",
        });
        break;
      default:
        return;
    }
    canvasRef.current.add(shape);
  };

  const downloadImage = () => {
    const dataURL = canvasRef.current.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <>
      <button
        onClick={onBack}
        className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full text-white transition"
      >
        ⬅ Back
      </button>
      <div className="grid grid-cols-[1fr_350px] gap-2 p-4">
        <div className="flex justify-center items-start">
          <canvas ref={canvasElRef} className="border shadow" />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border border-gray-400 shadow-2xl rounded-3xl py-4 px-6">
          <p className="text-sm m-0">Select Color</p>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3  w-full">
              <div className="relative w-10 h-10">
                <input
                  type="color"
                  value={shapeColors.text}
                  onChange={(e) => handleColorChange("text", e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="w-full h-full rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: shapeColors.text }}
                />
              </div>
              <button
                onClick={addText}
                className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-3xl cursor-pointer text-white transition"
              >
                ➕ Add Text
              </button>
            </div>

            <div className="flex items-center gap-3  w-full">
              <div className="relative w-10 h-10">
                <input
                  type="color"
                  value={shapeColors.circle}
                  onChange={(e) => handleColorChange("circle", e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="w-full h-full rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: shapeColors.circle }}
                />
              </div>
              <button
                onClick={() => addShape("circle")}
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-3xl cursor-pointer text-white transition"
              >
                ● Circle
              </button>
            </div>

            <div className="flex items-center gap-3  w-full">
              <div className="relative w-10 h-10">
                <input
                  type="color"
                  value={shapeColors.rect}
                  onChange={(e) => handleColorChange("rect", e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="w-full h-full rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: shapeColors.rect }}
                />
              </div>
              <button
                onClick={() => addShape("rect")}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-3xl cursor-pointer text-white transition"
              >
                ▭ Rectangle
              </button>
            </div>

            <div className="flex items-center gap-3  w-full">
              <div className="relative w-10 h-10">
                <input
                  type="color"
                  value={shapeColors.triangle}
                  onChange={(e) =>
                    handleColorChange("triangle", e.target.value)
                  }
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="w-full h-full rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: shapeColors.triangle }}
                />
              </div>
              <button
                onClick={() => addShape("triangle")}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 cursor-pointer rounded-3xl text-white transition"
              >
                ▲ Triangle
              </button>
            </div>
          </div>

          <button
            onClick={downloadImage}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-3xl text-white transition w-full cursor-pointer self-end"
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorCanvas;
