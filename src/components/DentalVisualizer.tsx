import React from 'react';
import type { TransformationCase } from '../data/transformationsData';

interface DentalVisualizerProps {
  caseItem: TransformationCase;
  view: 'before' | 'after';
}

export const DentalVisualizer: React.FC<DentalVisualizerProps> = ({ caseItem, view }) => {
  const isBefore = view === 'before';

  switch (caseItem.caseType) {
    case 'whitening':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Healthy Gums Gradient */}
              <linearGradient id="gumsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fda4af" stopOpacity="0.75" />
              </linearGradient>

              {/* Before Teeth Enamel (Yellowed / Stained) */}
              <linearGradient id="teethBefore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ca8a04" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#eab308" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
              </linearGradient>

              {/* After Teeth Enamel (Luminous Pearl White) */}
              <linearGradient id="teethAfter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#f8fafc" stopOpacity="1" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
              </linearGradient>

              {/* Specular Gleam Highlight */}
              <linearGradient id="gleamGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Mouth Interior */}
            <rect width="800" height="520" fill="#0f172a" />
            <ellipse cx="400" cy="270" rx="360" ry="180" fill="#1e1b4b" opacity="0.4" />

            {/* Upper Lips & Gingiva */}
            <path
              d="M 120 180 Q 400 130 680 180 Q 640 100 400 90 Q 160 100 120 180 Z"
              fill="#be123c"
              opacity="0.9"
            />
            {/* Upper Gumline scallops */}
            <path
              d="M 160 185 
                 Q 210 145 250 185 
                 Q 290 140 330 185 
                 Q 365 135 400 185 
                 Q 435 135 470 185 
                 Q 510 140 550 185 
                 Q 590 145 640 185 
                 Q 600 150 400 140 
                 Q 200 150 160 185 Z"
              fill="url(#gumsGradient)"
            />

            {/* Upper Teeth Arch */}
            {/* Right Canine */}
            <path
              d="M 195 185 C 190 220 200 270 215 285 C 235 290 245 270 248 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Right Lateral Incisor */}
            <path
              d="M 252 185 C 248 230 252 285 270 295 C 295 295 305 270 310 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Right Central Incisor */}
            <path
              d="M 314 185 C 310 240 315 310 335 320 C 375 320 388 300 395 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Left Central Incisor */}
            <path
              d="M 405 185 C 412 300 425 320 465 320 C 485 310 490 240 486 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Left Lateral Incisor */}
            <path
              d="M 490 185 C 495 270 505 295 530 295 C 548 285 552 230 548 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            {/* Left Canine */}
            <path
              d="M 552 185 C 555 270 565 290 585 285 C 600 270 610 220 605 185 Z"
              fill={isBefore ? 'url(#teethBefore)' : 'url(#teethAfter)'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />

            {/* Lower Teeth Row (Background depth) */}
            <g opacity="0.88">
              <path
                d="M 280 345 C 300 330 320 330 335 345 L 340 375 C 320 380 295 380 280 375 Z"
                fill={isBefore ? '#b45309' : '#f1f5f9'}
              />
              <path
                d="M 342 345 C 365 330 385 330 400 345 L 400 380 C 375 385 350 385 342 380 Z"
                fill={isBefore ? '#d97706' : '#ffffff'}
              />
              <path
                d="M 403 345 C 420 330 440 330 460 345 L 458 380 C 440 385 415 385 403 380 Z"
                fill={isBefore ? '#d97706' : '#ffffff'}
              />
              <path
                d="M 465 345 C 480 330 500 330 520 345 L 515 375 C 495 380 475 380 465 375 Z"
                fill={isBefore ? '#b45309' : '#f1f5f9'}
              />
            </g>

            {/* Stains & Micro-calcifications for 'Before' */}
            {isBefore && (
              <g opacity="0.65">
                <path d="M 330 200 Q 360 215 380 200 Q 355 230 330 200 Z" fill="#78350f" />
                <path d="M 420 205 Q 450 220 470 205 Q 445 235 420 205 Z" fill="#78350f" />
                <circle cx="345" cy="275" r="4.5" fill="#92400e" opacity="0.8" />
                <circle cx="370" cy="285" r="3" fill="#b45309" opacity="0.7" />
                <circle cx="440" cy="280" r="5" fill="#92400e" opacity="0.85" />
                <circle cx="460" cy="265" r="3.5" fill="#78350f" opacity="0.75" />
                {/* Yellowish Tint filter across smile */}
                <rect x="180" y="160" width="440" height="170" fill="#d97706" opacity="0.18" style={{ mixBlendMode: 'multiply' }} />
              </g>
            )}

            {/* Specular White Enamel Highlights for 'After' */}
            {!isBefore && (
              <g filter="url(#softGlow)">
                {/* Glossy vertical reflections on central incisors */}
                <path
                  d="M 330 210 Q 338 270 342 300 Q 346 300 342 210 Z"
                  fill="url(#gleamGlow)"
                  opacity="0.95"
                />
                <path
                  d="M 460 210 Q 452 270 448 300 Q 444 300 448 210 Z"
                  fill="url(#gleamGlow)"
                  opacity="0.95"
                />
                {/* Diamond Sparkle Stars */}
                <path
                  d="M 370 230 L 373 240 L 383 243 L 373 246 L 370 256 L 367 246 L 357 243 L 367 240 Z"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <path
                  d="M 440 270 L 442 277 L 449 279 L 442 281 L 440 288 L 438 281 L 431 279 L 438 277 Z"
                  fill="#ffffff"
                  opacity="0.85"
                />
              </g>
            )}

            {/* Lower Lip */}
            <path
              d="M 120 350 Q 400 480 680 350 Q 560 490 400 490 Q 240 490 120 350 Z"
              fill="#be123c"
              opacity="0.95"
            />
          </svg>

          {/* Aesthetic Watermark Indicator */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/10 shadow-lg">
            {isBefore ? '🔴 Pre-Op: Shade C3' : '🟢 Post-Op: Shade BL1'}
          </div>
        </div>
      );

    case 'veneers':
    case 'bonding':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="800" height="520" fill="#0b0f19" />
            <ellipse cx="400" cy="270" rx="360" ry="180" fill="#1e1b4b" opacity="0.3" />

            {/* Upper Lip */}
            <path
              d="M 120 180 Q 400 130 680 180 Q 640 100 400 90 Q 160 100 120 180 Z"
              fill="#be123c"
              opacity="0.9"
            />

            {/* Gums */}
            <path
              d="M 160 185 Q 210 145 250 185 Q 290 140 330 185 Q 365 135 400 185 Q 435 135 470 185 Q 510 140 550 185 Q 590 145 640 185 Q 600 150 400 140 Q 200 150 160 185 Z"
              fill="#fb7185"
              opacity="0.8"
            />

            {/* TEETH RENDERING */}
            {isBefore ? (
              // BEFORE: Noticeable 3.2mm diastema gap, chipped corners, uneven edges
              <g>
                {/* Right Central Incisor (Chipped corner & spaced away from center) */}
                <path
                  d="M 305 185 C 302 240 305 310 320 318 C 350 318 368 298 375 285 C 378 280 380 200 380 185 Z"
                  fill="#fef08a"
                  stroke="#d97706"
                  strokeWidth="1.2"
                />
                {/* Left Central Incisor (Gap in between, cracked lower edge) */}
                <path
                  d="M 418 185 C 418 200 420 280 425 290 C 435 305 450 318 478 318 C 492 310 496 240 492 185 Z"
                  fill="#fef08a"
                  stroke="#d97706"
                  strokeWidth="1.2"
                />
                {/* Visible Midline Diastema Space Shadow */}
                <rect x="382" y="185" width="34" height="135" fill="#0f172a" opacity="0.95" />

                {/* Lateral Incisors slightly tilted */}
                <path
                  d="M 245 185 C 242 230 248 280 262 288 C 285 288 295 265 300 185 Z"
                  fill="#fef08a"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <path
                  d="M 498 185 C 502 265 512 288 535 288 C 550 280 554 230 550 185 Z"
                  fill="#fef08a"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
              </g>
            ) : (
              // AFTER: Closed gap, perfectly symmetrical Hollywood ceramic contours
              <g>
                {/* Right Central Incisor (Full Golden Proportion & Natural Translucency) */}
                <path
                  d="M 312 185 C 308 240 312 315 330 322 C 375 322 396 312 398 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                {/* Left Central Incisor (Meeting perfectly at midline) */}
                <path
                  d="M 402 185 C 404 312 425 322 470 322 C 488 315 492 240 488 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                {/* Lateral Incisors Harmonious */}
                <path
                  d="M 250 185 C 246 230 252 290 270 298 C 295 298 306 270 308 185 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 492 185 C 494 270 505 298 530 298 C 548 290 552 230 548 185 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />

                {/* Porcelain Glaze Reflection */}
                <path
                  d="M 335 210 Q 345 270 350 305 Q 354 305 348 210 Z"
                  fill="#ffffff"
                  opacity="0.8"
                />
                <path
                  d="M 465 210 Q 455 270 450 305 Q 446 305 452 210 Z"
                  fill="#ffffff"
                  opacity="0.8"
                />
                <path
                  d="M 390 240 L 392 245 L 397 247 L 392 249 L 390 254 L 388 249 L 383 247 L 388 245 Z"
                  fill="#38bdf8"
                  opacity="0.9"
                />
              </g>
            )}

            {/* Lower Lip */}
            <path
              d="M 120 350 Q 400 480 680 350 Q 560 490 400 490 Q 240 490 120 350 Z"
              fill="#be123c"
              opacity="0.95"
            />
          </svg>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/10 shadow-lg">
            {isBefore ? '🔴 Pre-Op: Diastema & Chipping' : '🟢 Post-Op: Seamless Ceramic'}
          </div>
        </div>
      );

    case 'ortho':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="800" height="520" fill="#0b0f19" />
            <ellipse cx="400" cy="270" rx="360" ry="180" fill="#1e1b4b" opacity="0.3" />

            {/* Upper Lip */}
            <path
              d="M 120 180 Q 400 130 680 180 Q 640 100 400 90 Q 160 100 120 180 Z"
              fill="#be123c"
              opacity="0.9"
            />

            {/* Gums */}
            <path
              d="M 160 185 Q 210 145 250 185 Q 290 140 330 185 Q 365 135 400 185 Q 435 135 470 185 Q 510 140 550 185 Q 590 145 640 185 Q 600 150 400 140 Q 200 150 160 185 Z"
              fill="#fb7185"
              opacity="0.8"
            />

            {isBefore ? (
              // BEFORE: Crooked, rotated teeth overlapping each other
              <g>
                {/* Canine popped forward */}
                <path
                  d="M 190 170 C 185 220 190 270 215 285 C 240 285 248 260 245 170 Z"
                  fill="#f1f5f9"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  transform="rotate(6 215 230)"
                />
                {/* Rotated lateral incisor tucked behind */}
                <path
                  d="M 245 195 C 240 240 245 280 260 288 C 280 288 288 260 290 195 Z"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1"
                  transform="rotate(-12 265 240)"
                />
                {/* Crooked Right Central overlapping */}
                <path
                  d="M 295 185 C 290 240 300 310 325 320 C 365 320 380 295 385 185 Z"
                  fill="#f8fafc"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  transform="rotate(8 335 250)"
                />
                {/* Left Central protruding forward */}
                <path
                  d="M 390 180 C 400 295 415 325 455 325 C 475 315 480 240 476 180 Z"
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  transform="rotate(-5 435 250)"
                />
                {/* Left Lateral squeezed back */}
                <path
                  d="M 480 195 C 485 260 495 285 515 285 C 532 275 536 230 532 195 Z"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1"
                  transform="rotate(14 505 240)"
                />
              </g>
            ) : (
              // AFTER: Perfectly parallel, symmetrical parabolic dental arch
              <g>
                <path
                  d="M 195 185 C 190 220 200 270 215 285 C 235 290 245 270 248 185 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 252 185 C 248 230 252 285 270 295 C 295 295 305 270 310 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 314 185 C 310 240 315 310 335 320 C 375 320 388 300 395 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 405 185 C 412 300 425 320 465 320 C 485 310 490 240 486 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 490 185 C 495 270 505 295 530 295 C 548 285 552 230 548 185 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <path
                  d="M 552 185 C 555 270 565 290 585 285 C 600 270 610 220 605 185 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
              </g>
            )}

            {/* Lower Lip */}
            <path
              d="M 120 350 Q 400 480 680 350 Q 560 490 400 490 Q 240 490 120 350 Z"
              fill="#be123c"
              opacity="0.95"
            />
          </svg>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/10 shadow-lg">
            {isBefore ? '🔴 Pre-Op: Severe Crowding' : '🟢 Post-Op: Ideal Class I Arch'}
          </div>
        </div>
      );

    case 'implant':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="800" height="520" fill="#0b0f19" />
            <ellipse cx="400" cy="270" rx="360" ry="180" fill="#1e1b4b" opacity="0.3" />

            {/* Upper Lip */}
            <path
              d="M 120 180 Q 400 130 680 180 Q 640 100 400 90 Q 160 100 120 180 Z"
              fill="#be123c"
              opacity="0.9"
            />

            {/* Gums */}
            <path
              d="M 160 185 Q 210 145 250 185 Q 290 140 330 185 Q 365 135 400 185 Q 435 135 470 185 Q 510 140 550 185 Q 590 145 640 185 Q 600 150 400 140 Q 200 150 160 185 Z"
              fill="#fb7185"
              opacity="0.8"
            />

            {/* Teeth with Missing Left Central vs Restored Titanium & Zirconia Crown */}
            <g>
              {/* Right Central Incisor (Natural) */}
              <path
                d="M 314 185 C 310 240 315 310 335 320 C 375 320 388 300 395 185 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />

              {isBefore ? (
                // BEFORE: Fractured missing tooth with empty gum concavity
                <g>
                  {/* Empty gap with shaded recessed gum socket */}
                  <path
                    d="M 400 185 Q 445 220 486 185 Z"
                    fill="#9f1239"
                    stroke="#881337"
                    strokeWidth="1.5"
                  />
                  <rect x="402" y="195" width="82" height="120" fill="#090d16" opacity="0.9" rx="8" />
                  <text x="443" y="260" fill="#e11d48" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Missing #9
                  </text>
                </g>
              ) : (
                // AFTER: Bio-mimetic Zirconia Crown on Straumann Titanium Base
                <g>
                  <path
                    d="M 405 185 C 412 300 425 320 465 320 C 485 310 490 240 486 185 Z"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="1"
                  />
                  {/* Natural translucent gleam */}
                  <path
                    d="M 460 210 Q 452 270 448 300 Q 444 300 448 210 Z"
                    fill="#38bdf8"
                    opacity="0.5"
                  />
                  <text x="445" y="340" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Permanent Zirconia
                  </text>
                </g>
              )}

              {/* Adjacent Teeth */}
              <path
                d="M 252 185 C 248 230 252 285 270 295 C 295 295 305 270 310 185 Z"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <path
                d="M 490 185 C 495 270 505 295 530 295 C 548 285 552 230 548 185 Z"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
            </g>

            {/* Lower Lip */}
            <path
              d="M 120 350 Q 400 480 680 350 Q 560 490 400 490 Q 240 490 120 350 Z"
              fill="#be123c"
              opacity="0.95"
            />
          </svg>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/10 shadow-lg">
            {isBefore ? '🔴 Pre-Op: Missing Central Incisor' : '🟢 Post-Op: Permanent Implant'}
          </div>
        </div>
      );

    case 'cavity':
    default:
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 select-none">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="800" height="520" fill="#090d16" />

            {/* Large Macro Close-up of Molar Tooth Occlusal Surface */}
            <g transform="translate(400, 260) scale(1.6)">
              {/* Tooth Crown Perimeter */}
              <path
                d="M -110 -90 
                   C -70 -120 70 -120 110 -90 
                   C 140 -50 140 50 110 90 
                   C 70 120 -70 120 -110 90 
                   C -140 50 -140 -50 -110 -90 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              {/* Tooth Anatomy Cusps & Grooves */}
              <path d="M -70 0 C 0 -20 0 20 70 0" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <path d="M 0 -70 C -20 0 20 0 0 70" stroke="#94a3b8" strokeWidth="2" fill="none" />

              {isBefore ? (
                // BEFORE: Leaking dark black/gray mercury amalgam filling with decay borders
                <g>
                  {/* Corroded dark amalgam filling in center */}
                  <path
                    d="M -45 -35 
                       C -20 -55 35 -45 50 -20 
                       C 60 10 35 45 10 45 
                       C -25 45 -55 20 -50 -10 Z"
                    fill="#1f2937"
                    stroke="#111827"
                    strokeWidth="3"
                  />
                  {/* Micro-leakage dark stain cracks */}
                  <path d="M 50 -20 L 75 -40" stroke="#000000" strokeWidth="2" />
                  <path d="M -45 -35 L -65 -55" stroke="#000000" strokeWidth="2" />
                  <path d="M 10 45 L 20 68" stroke="#000000" strokeWidth="2" />
                  <circle cx="0" cy="5" r="16" fill="#374151" opacity="0.8" />
                </g>
              ) : (
                // AFTER: Seamless Tooth-Colored Nano-Ceramic Composite Onlay
                <g>
                  <path
                    d="M -45 -35 
                       C -20 -55 35 -45 50 -20 
                       C 60 10 35 45 10 45 
                       C -25 45 -55 20 -50 -10 Z"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />
                  {/* Subtle physiological fissures */}
                  <path d="M -20 -15 Q 0 0 20 -15" stroke="#fcd34d" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M 0 -15 L 0 20" stroke="#fcd34d" strokeWidth="1" fill="none" opacity="0.6" />
                  <ellipse cx="-15" cy="-20" rx="10" ry="5" fill="#38bdf8" opacity="0.3" />
                </g>
              )}
            </g>
          </svg>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/10 shadow-lg">
            {isBefore ? '🔴 Pre-Op: Leaking Metal Amalgam' : '🟢 Post-Op: Biocompatible Ceramic'}
          </div>
        </div>
      );
  }
};
