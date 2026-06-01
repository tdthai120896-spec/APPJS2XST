{/* Modal hiển thị chi tiết game khi người dùng click vào một game nào đó */}
import React from 'react'
import { X } from 'lucide-react'
import GameCard from './GameCard'

function GameModal({ selectedGame, onClose }) {
  // Nếu không có game nào được chọn thì không hiển thị gì cả
  if (!selectedGame) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Lớp nền mờ phía sau */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      {/* Nội dung Modal */}
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0b101a] z-50">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-[100] p-2 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Component hiển thị thông tin chi tiết game */}
        <GameCard game={selectedGame} onClose={onClose} />
      </div>
    </div>
  )
}

export default GameModal