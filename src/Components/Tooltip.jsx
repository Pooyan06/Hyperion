export default function Tooltip({ hotspot, title, text, containerWidth }) {
  const gap = 20; // فاصله tooltip از hotspot
  const tooltipWidth = 250;

  // بررسی سمت tooltip: راست یا چپ
  let left = hotspot.x + hotspot.width + gap;
  if (left + tooltipWidth > containerWidth) {
    left = hotspot.x - tooltipWidth - gap; // سمت چپ
  }

  const top = hotspot.y + hotspot.height / 2;

  // مشخص کردن سمت connector
  const connectorOnRight = left > hotspot.x;

  return (
    <div
      className='pointer-events-none absolute flex items-center'
      style={{
        top: top,
        left: left,
        transform: 'translateY(-50%)',
      }}
    >
      {/* خط connector */}
      <div
        className='h-[2px] bg-white'
        style={{
          width: gap,
          marginRight: connectorOnRight ? '0.5rem' : '0',
          marginLeft: connectorOnRight ? '0' : '0.5rem',
        }}
      />

      {/* باکس tooltip */}
      <div className='bg-opacity-80 max-w-xs rounded-md border-t-2 border-blue-500 bg-[#000205] px-4 py-2 text-white shadow-lg'>
        <h3 className='mb-1 text-sm font-semibold'>{title}</h3>
        <p className='text-xs leading-snug text-gray-300'>{text}</p>
      </div>
    </div>
  );
}
