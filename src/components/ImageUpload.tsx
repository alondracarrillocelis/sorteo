import { useRef } from 'react';
import { Image, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage: string | null;
}

function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Image className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white">Imagen de Promoción</h2>
      </div>

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {currentImage ? (
        <div className="space-y-4">
          <img
            src={currentImage}
            alt="Vista previa"
            className="w-full h-48 object-cover rounded-xl shadow-lg"
          />

          <button
            onClick={() => imageInputRef.current?.click()}
            className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Cambiar imagen
          </button>
        </div>
      ) : (
        <button
          onClick={() => imageInputRef.current?.click()}
          className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Subir imagen
        </button>
      )}

      <p className="text-white/80 text-sm mt-3">
        Sube una imagen de la promoción o rifa
      </p>
    </div>
  );
}

export default ImageUpload;
