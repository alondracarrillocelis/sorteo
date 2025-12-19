import { Users } from 'lucide-react';

interface ParticipantsListProps {
  participants: string[];
}

function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-white" />
          <h3 className="text-2xl font-bold text-white">
            Lista de Participantes ({participants.length})
          </h3>
        </div>

        <div className="max-h-64 overflow-y-auto bg-white/5 rounded-xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 border border-white/10 transition-all duration-200"
              >
                <p className="text-white font-medium truncate">
                  {index + 1}. {participant}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsList;
