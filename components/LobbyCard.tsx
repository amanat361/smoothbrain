// "use client";

import { LobbyWithId, LobbyState } from '@/app/types';
import { Link } from './catalyst/link';
// import { Button } from './catalyst/button';
// import { deleteLobby } from '@/app/actions';

function Status({ status }: { status: LobbyState }) {
  let text: string;
  let textColorClass: string;
  let bgColorClass: string;

  switch (status) {
    case 'waiting':
      text = 'Waiting';
      textColorClass = 'text-blue-500';
      bgColorClass = 'bg-blue-500';
      break;
    case 'playing':
      text = 'Playing';
      textColorClass = 'text-green-500';
      bgColorClass = 'bg-green-500';
      break;
    case 'finished':
      text = 'Finished';
      textColorClass = 'text-red-500';
      bgColorClass = 'bg-red-500';
      break;
    default:
      text = 'Unknown';
      textColorClass = 'text-gray-500';
      bgColorClass = 'bg-gray-500';
  }

  return (
    <div className="flex justify-between items-center">
      <span className={textColorClass}>{text}</span>
      <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
    </div>
  );
}

export default function LobbyCard({ lobby }: { lobby: LobbyWithId }) {
  return (
    <div className='flex flex-col gap-4'>
      <Link
        className="bg-white shadow rounded-lg p-6 hover:bg-gray-50 transition"
        href={`/lobbies/${lobby.id}`}
      >
        <div className="mb-4">
          {/* <h2 className="font-semibold text-gray-700">Status: {lobby.state}</h2> */}
          <Status status={lobby.state} />
          <p className="text-sm text-gray-500">
            Created: {new Date(lobby.created_at).toLocaleString()}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-2">
            Players ({lobby.players.length}):
          </h2>
          {lobby.players.length === 0 ? (
            <p className="text-gray-500 italic">No players yet</p>
          ) : (
            <ul className="space-y-1">
              {lobby.players.map((player) => (
                <li key={player.id} className="px-3 py-2 bg-gray-50 rounded">
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
      {/* <Button
        className="mt-4"
        onClick={async () => await deleteLobby(lobby.id)}
      >
        Delete Lobby
      </Button> */}
    </div>
  );
}