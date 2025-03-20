"use client"

import type React from "react"
import { isEqual } from "lodash"
import { AlertTriangle } from "lucide-react"

interface InfoPopUp {
  isOpen: boolean
  onClose: any;
  message?: string
}

const InfoPopUp: React.FC<InfoPopUp> = ({
  isOpen,
  onClose,
  message = "An error has occurred while selecting language.",
}) => {
  if (!isOpen) return null

  const handleOverlayClick = (e: any) => {
    if (isEqual(e.target.id, "overlay")) {
      onClose()
    }
  }

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-lg w-[380px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-[#FF5757] p-4 flex justify-center">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="p-4 text-center space-y-4">
          <h2 className="text-xl font-bold text-[#2F3545]">Warning!</h2>
          <p className="text-gray-600 text-sm">{message}</p>

          <button
            onClick={onClose}
            className="bg-[#FF5757] text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-[#ff4343] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoPopUp

