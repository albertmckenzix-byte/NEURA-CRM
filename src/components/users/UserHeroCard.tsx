export default function UserHeroCard() {
  const avatarColors = [
    '#0284c7',
    '#059669',
    '#d97706',
    '#dc2626',
    '#7c3aed',
    '#db2777',
    '#4b5563',
    '#2563eb',
  ];

  const avatarPositions = [
    { top: '0px', left: '10px' },
    { top: '4px', left: '55px' },
    { top: '2px', left: '105px' },
    { top: '14px', left: '155px' },
    { top: '42px', left: '20px' },
    { top: '38px', left: '72px' },
    { top: '46px', left: '122px' },
    { top: '54px', left: '168px' },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 overflow-hidden relative flex flex-col justify-between min-h-[200px] select-none shadow-sm border border-neutral-100">
      {/* Top row */}
      <div className="flex items-center justify-between z-10 relative">
        <span className="text-[12px] font-semibold text-neutral-800 tracking-tight">
          Active top users this month
        </span>
        <div className="flex items-center bg-neutral-100 text-neutral-800 text-[11px] font-bold px-2.5 py-[3px] rounded-full border border-neutral-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse" />
          312 online now
        </div>
      </div>

      {/* Avatar Cluster */}
      <div className="absolute right-5 top-5 w-[220px] h-[120px] pointer-events-none opacity-80">
        {avatarPositions.map((pos, idx) => (
          <div
            key={idx}
            className="w-10 h-10 rounded-full border-2 border-white absolute shadow-md transition-all hover:scale-110 flex items-center justify-center text-white text-[11px] font-bold"
            style={{
              backgroundColor: avatarColors[idx],
              top: pos.top,
              left: pos.left,
            }}
          >
            {String.fromCharCode(65 + idx)}
          </div>
        ))}
      </div>

      {/* Metric Section */}
      <div className="z-10 relative mt-12">
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-bold text-neutral-900 tracking-tight leading-none">
            2,847
          </span>
          <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            +8.2% vs last month
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1 font-medium">
          Total active users across registered enterprise accounts
        </p>
      </div>
    </div>
  );
}