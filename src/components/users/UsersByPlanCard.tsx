export default function UsersByPlanCard() {
  return (
    <div className="bg-white rounded-[24px] p-5 flex flex-col justify-between min-h-[200px] select-none shadow-sm border border-neutral-100">
      {/* Top Label */}
      <div className="text-[13px] text-neutral-800 font-semibold flex items-center justify-between">
        <span>Users by plan</span>
        <span className="w-2 h-2 rounded-full bg-neutral-300" />
      </div>

      {/* Bubble visualization */}
      <div className="relative h-[160px] w-full my-auto">
        {/* Free Circle */}
        <div
          className="absolute w-[90px] h-[90px] rounded-full bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center text-center shadow-sm transition-transform hover:scale-105"
          style={{ left: '10px', top: '30px' }}
        >
          <span className="text-[16px] font-bold text-neutral-900 leading-tight">
            1,412
          </span>
          <span className="text-[10px] text-neutral-500 font-medium">Free</span>
        </div>

        {/* Pro Circle */}
        <div
          className="absolute w-[68px] h-[68px] rounded-full bg-amber-50 border border-amber-200/80 flex flex-col items-center justify-center text-center shadow-sm text-amber-900 transition-transform hover:scale-105"
          style={{ left: '95px', top: '5px' }}
        >
          <span className="text-[14px] font-bold leading-tight">806</span>
          <span className="text-[10px] font-semibold text-amber-700">Pro</span>
        </div>

        {/* Team Circle */}
        <div
          className="absolute w-[58px] h-[58px] rounded-full bg-sky-50 border border-sky-200/80 flex flex-col items-center justify-center text-center shadow-sm text-sky-900 transition-transform hover:scale-105"
          style={{ left: '110px', top: '65px' }}
        >
          <span className="text-[13px] font-bold leading-tight">482</span>
          <span className="text-[10px] font-semibold text-sky-700">Team</span>
        </div>

        {/* Enterprise Circle */}
        <div
          className="absolute w-[44px] h-[44px] rounded-full bg-neutral-900 text-white flex flex-col items-center justify-center text-center shadow-md transition-transform hover:scale-105"
          style={{ left: '60px', top: '95px' }}
        >
          <span className="text-[11px] font-bold leading-tight">147</span>
          <span className="text-[8px] font-medium text-neutral-300 leading-none">Ent</span>
        </div>
      </div>

      {/* Bottom legend row */}
      <div className="text-[11px] text-neutral-400 mt-3 font-medium">
        Free 50% · Pro 28% · Team 17% · Ent 5%
      </div>
    </div>
  );
}