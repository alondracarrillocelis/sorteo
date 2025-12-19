import { Trophy, Star, Sparkles } from 'lucide-react';
import Confetti from './confetti';

interface WinnerDisplayProps {
  winner: string;
  promoImage: string | null;
  isSpinning: boolean;
}

function WinnerDisplay({ winner, promoImage, isSpinning }: WinnerDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto relative">
      {/* 🎆 Confetti SOLO cuando hay ganador */}
      {!isSpinning && <Confetti />}

      <div className="relative">
        <div
          className={`bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${
            isSpinning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
          }`}
        >
          {promoImage && (
            <div className="mb-6">
              <img
                src={promoImage}
                alt="Promoción"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          <div className="text-center">
            {/* 🏆 Íconos */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isSpinning ? 'Sorteando...' : '¡Felicidades!'}
            </h2>

            <div
              className={`relative overflow-hidden rounded-2xl p-8 mb-6 ${
                isSpinning
                  ? 'bg-gradient-to-r from-gray-100 to-gray-200'
                  : 'bg-gradient-to-r from-green-600 via-red-600 to-green-700'
              }`}
            >
              {!isSpinning && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-30 animate-pulse"></div>
              )}

              <div className="relative z-10">
                <p className="text-xl font-semibold text-white mb-2 drop-shadow-lg">
                  El/la ganador/a es:
                </p>

                {/* 🏆 NOMBRE CON GLOW DORADO */}
                <p
                  className={`text-5xl font-black drop-shadow-2xl ${
                    isSpinning
                      ? 'text-white animate-pulse'
                      : 'winner-glow'
                  }`}
                >
                  {winner}
                </p>
              </div>
            </div>

            {!isSpinning && (
              <div className="flex items-center justify-center gap-2 text-gray-600 animate-pulse">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <p className="text-lg font-semibold">
                  ¡Ha ganado la cena navideña!
                </p>
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
            )}
          </div>
        </div>

        {/* ✨ Destellos decorativos */}
        {!isSpinning && (
          <>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-40 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full opacity-40 blur-2xl animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-red-500 rounded-full opacity-40 blur-xl animate-ping"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-yellow-400 rounded-full opacity-40 blur-xl animate-ping"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default WinnerDisplay;
