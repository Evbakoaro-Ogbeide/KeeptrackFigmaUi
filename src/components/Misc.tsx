import { FileText, Settings, ChevronRight } from 'lucide-react';

export function Misc() {
  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">
      {/* Top App Bar */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-[#1C1B1F]">More</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Templates Option */}
          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8DEF8] flex items-center justify-center">
                <FileText size={20} className="text-[#6750A4]" />
              </div>
              <div className="text-left">
                <div className="text-[#1C1B1F]">Templates</div>
                <div className="text-sm text-gray-600">Create and edit workout templates</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          {/* Settings Option */}
          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8DEF8] flex items-center justify-center">
                <Settings size={20} className="text-[#6750A4]" />
              </div>
              <div className="text-left">
                <div className="text-[#1C1B1F]">Settings</div>
                <div className="text-sm text-gray-600">App preferences and account</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Additional Info Card */}
        <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <span className="text-[#1C1B1F]">Templates</span> allow you to save workout configurations that you can reuse for future sessions.
            </p>
            <p>
              <span className="text-[#1C1B1F]">Settings</span> let you customize your experience, manage your profile, and configure app preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
