import { useState, useRef, useEffect } from 'react';
import LightRays from '../theme/LightRays';
import ElectricBorder from '../theme/ElectricBorder';
import { MorphingText } from '../theme/MorphingText';

export default function Landing() {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [lineCoords, setLineCoords] = useState(null);
  const [lineLength, setLineLength] = useState(0);

  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const activeHotspotRef = useRef(null);

  const hotspots = [
    {
      id: 1,
      top: 9.5,
      left: 5,
      width: 14,
      height: 95,
      image: './product/product1.webp',
      preview: './preview/preview1.webp',
      title: 'Test1',
      tooltip: 'test test test test test test',
    },
    {
      id: 2,
      top: 0,
      left: 80,
      width: 8,
      height: 26,
      image: './product/product2.webp',
      preview: './preview/preview2.webp',
      title: 'Test2',
      tooltip: 'test test test test test test',
    },
    {
      id: 3,
      top: 35,
      left: 63,
      width: 14,
      height: 8,
      image: './product/product3.webp',
      preview: './preview/preview3.webp',
      title: 'Test3',
      tooltip: 'test test test test test test',
    },
    {
      id: 4,
      top: 14,
      left: 21,
      width: 18,
      height: 14,
      image: './product/product4.webp',
      preview: './preview/preview4.webp',
      title: 'Test4',
      tooltip: 'test test test test test test',
    },
  ];

  const calculateLine = () => {
    if (
      !containerRef.current ||
      !previewRef.current ||
      !activeHotspotRef.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const hotspotRect = activeHotspotRef.current.getBoundingClientRect();
    const previewRect = previewRef.current.getBoundingClientRect();

    const x1 = hotspotRect.left - containerRect.left + hotspotRect.width / 2;

    const y1 = hotspotRect.top - containerRect.top + hotspotRect.height / 2;

    const x2 = previewRect.left - containerRect.left + previewRect.width / 2;

    const y2 = previewRect.top - containerRect.top + previewRect.height / 2;

    setLineCoords({ x1, y1, x2, y2 });

    const length = Math.hypot(x2 - x1, y2 - y1);
    setLineLength(length);
  };

  const handleEnter = (id, e) => {
    setActiveTooltip(id);
    activeHotspotRef.current = e.currentTarget;
    calculateLine();
  };

  const handleLeave = () => {
    setActiveTooltip(null);
    activeHotspotRef.current = null;
    setLineCoords(null);
    setLineLength(0);
  };

  useEffect(() => {
    if (!activeTooltip) return;

    const update = () => calculateLine();

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [activeTooltip]);

  return (
    <div className='relative flex min-h-screen pt-5' ref={containerRef}>
      {/* Left Preview */}
      <div className='relative flex w-1/3 items-center justify-center'>
        <div
          ref={previewRef}
          className='relative flex h-100 w-100 items-center justify-center rounded-md bg-[#000205]'
        >
          {hotspots.map((h) => (
            <div
              key={h.id}
              className={`box absolute transition-all duration-500 ease-out ${
                activeTooltip === h.id
                  ? 'z-10 scale-100 opacity-100'
                  : 'z-0 scale-90 opacity-0'
              }`}
            >
              <ElectricBorder
                color='#7df9ff'
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className='relative h-full w-full p-0.5'>
                  <img
                    src={h.preview}
                    alt='preview'
                    className='max-h-[500px] max-w-full rounded-md object-contain shadow-[0_0_0_1px_#5379ae]'
                  />
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </div>

      {/* Right Main Content */}
      <div className='relative w-2/3 pl-10'>
        <div className='pointer-events-none absolute inset-0 z-0'>
          <LightRays
            raysOrigin='top-center'
            raysColor='#ffffff'
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className='custom-rays'
          />
        </div>

        <div className='relative z-10 pt-3 text-center'>
          <MorphingText
            texts={['Hyperion device', 'Treasure finder']}
            className='text-slate-300'
          />
        </div>

        <div className='relative flex w-full justify-center overflow-hidden pt-6'>
          <div className='relative z-10 mx-auto aspect-[3/4] w-full max-w-[450px]'>
            <img
              src={
                activeTooltip
                  ? hotspots.find((h) => h.id === activeTooltip)?.image
                  : './product/product.webp'
              }
              className='absolute inset-0 z-10 h-full w-full object-contain transition-opacity duration-500 ease-out'
              alt='product'
            />

            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className='hotspot absolute z-20 cursor-pointer'
                style={{
                  top: `${hotspot.top}%`,
                  left: `${hotspot.left}%`,
                  width: `${hotspot.width}%`,
                  height: `${hotspot.height}%`,
                }}
                onMouseEnter={(e) => handleEnter(hotspot.id, e)}
                onMouseLeave={handleLeave}
              >
                {activeTooltip === hotspot.id && (
                  <div className='animate-fadeIn absolute left-full ml-2 w-[250px] rounded bg-black p-2 text-sm text-white shadow-lg'>
                    <h3 className='text-lg text-slate-300'>{hotspot.title}</h3>
                    <p className='pl-2 text-sm text-slate-400'>
                      {hotspot.tooltip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector Line */}
      {lineCoords && (
        <svg
          className='pointer-events-none absolute inset-0'
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient
              id='tooltipLineGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#5379ae' />
              <stop offset='100%' stopColor='#ffffff' />
            </linearGradient>
          </defs>

          <line
            x1={lineCoords.x1}
            y1={lineCoords.y1}
            x2={lineCoords.x2}
            y2={lineCoords.y2}
            stroke='url(#tooltipLineGradient)'
            strokeWidth='2'
            strokeDasharray={lineLength}
            strokeDashoffset={lineLength}
            strokeLinecap='round'
            className='animate-drawLineGlow'
          />
        </svg>
      )}
    </div>
  );
}
