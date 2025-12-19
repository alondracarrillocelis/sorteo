import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Trophy,
  Sparkles,
  Users,
  Play,
  RotateCcw
} from 'lucide-react';

import ParticipantsList from './components/ParticipantsList';
import WinnerDisplay from './components/WinnerDisplay';
import ImageUpload from './components/ImageUpload';
import Snow from './components/snow';

function App() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [promoImage, setPromoImage] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔔 sonido ganador
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    winSoundRef.current = new Audio('/sounds/win.mp3');
  }, []);

  useEffect(() => {
    if (winner && !isSpinning) {
      winSoundRef.current?.play();
    }
  }, [winner, isSpinning]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const names = text
        .split('\n')
        .map(line => line.split(',')[0].trim())
        .filter(
          name =>
            name &&
            name.toLowerCase() !== 'nombre' &&
            name.toLowerCase() !== 'name'
        );

      setParticipants(names);
      setWinner(null);
    };
    reader.readAsText(file);
  };

const performDraw = () => {
  if (!participants.length) return;

  setIsSpinning(true);
  setWinner(null);

  const TOTAL_DURATION = 15000; // ⏱️ 15 segundos
  const START_SPEED = 50;       // ms (muy rápido)
  const END_SPEED = 400;        // ms (lento al final)

  const startTime = Date.now();

  const spin = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);

    // 📉 easing: desaceleración suave
    const currentSpeed =
      START_SPEED + (END_SPEED - START_SPEED) * progress;

    // cambia nombre
    setWinner(
      participants[Math.floor(Math.random() * participants.length)]
    );

    if (elapsed < TOTAL_DURATION) {
      setTimeout(spin, currentSpeed);
    } else {
      // 🏆 ganador final
      setWinner(
        participants[Math.floor(Math.random() * participants.length)]
      );
      setIsSpinning(false);
    }
  };

  spin();
};



  const resetDraw = () => {
    setWinner(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-green-700 relative overflow-hidden">
      <Snow />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-10 h-10 text-yellow-300" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Rifa Navideña
            </h1>
            <Trophy className="w-10 h-10 text-yellow-300" />
          </div>

          {/* 🎄 Luces */}
          <div className="christmas-lights">
            <span className="light" />
            <span className="light" />
            <span className="light" />
            <span className="light" />
          </div>

          <p className="text-white/90 text-lg">
            Cena navideña 🎅🎁
          </p>
        </header>

        {!winner && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Cargar Participantes
                </h2>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Subir CSV
              </button>

              {participants.length > 0 && (
                <div className="mt-4 text-green-300 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {participants.length} participantes
                </div>
              )}
            </div>

            <ImageUpload
              onImageUpload={setPromoImage}
              currentImage={promoImage}
            />
          </div>
        )}

        {participants.length > 0 && promoImage && !winner && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <img
                src={promoImage}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <button
                onClick={performDraw}
                disabled={isSpinning}
                className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white font-bold py-6 px-8 rounded-xl transition-all shadow-2xl text-xl disabled:opacity-50"
              >
                <Play className="w-8 h-8 inline mr-2" />
                {isSpinning ? 'Sorteando...' : 'Realizar Sorteo'}
              </button>
            </div>
          </div>
        )}

        {winner && (
          <>
            <WinnerDisplay
              winner={winner}
              promoImage={promoImage}
              isSpinning={isSpinning}
            />

            {!isSpinning && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={performDraw}
                  className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Nuevo Sorteo
                </button>

                <button
                  onClick={resetDraw}
                  className="bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-xl"
                >
                  Configurar Nuevo
                </button>
              </div>
            )}
          </>
        )}

        {participants.length > 0 && !winner && (
          <ParticipantsList participants={participants} />
        )}
      </div>
    </div>
  );
}

export default App;
