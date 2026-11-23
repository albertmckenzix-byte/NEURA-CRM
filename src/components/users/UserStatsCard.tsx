export default function UserStatsCard() {
  const newAvatarColors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
  ];

  return (
    <div className="flex flex-col gap-3 select-none h-full">
      {/* Sub-card A: New this month */}
      <div className="bg-white rounded-[24px] p-5 flex flex-col justify-between flex-1 shadow-sm border border-neutral-100">
        <span className="text-[12px] text-neutral-500 font-medium">New this month</span>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[34px] font-bold text-neutral-900 leading-none tracking-tight">
            186
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {newAvatarColors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(70 + i)}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-neutral-700 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
              +82
            </span>
          </div>
        </div>
      </div>

      {/* Sub-card B: Pending invites */}
      <div className="bg-white rounded-[24px] p-5 flex flex-col justify-between flex-1 shadow-sm border border-neutral-100">
        <span className="text-[12px] text-neutral-500 font-medium">Pending invites</span>
        <div className="flex items-end mt-2 mb-2">
          <span className="text-[34px] font-bold text-neutral-900 leading-none tracking-tight">
            23
          </span>
          <span className="text-[13px] text-neutral-400 ml-1.5 pb-0.5 font-medium">
            of 186
          </span>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2.5 py-[3px] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            5 expire soon
          </span>
        </div>
      </div>
    </div>
  );
}