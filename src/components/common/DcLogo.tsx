/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — DcLogo.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/common/DcLogo.tsx
 * 🏷️ Type: UI Component (Brand Identity)
 * 📦 Module: Core UI & Branding
 * 🔗 Ver: ARCHITECTURE_MAP.md § Identidad Corporativa DC Asesores
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Definición de props y gradientes SVG oficiales (Rojo DC / Grafito)
 *   L26-L120 → Componente SVG vectorial de alta fidelidad del logotipo oficial
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';

interface DcLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
  showSubtitle?: boolean;
}

export const DcLogo: React.FC<DcLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color',
  showSubtitle = true,
}) => {
  const dimensions = {
    sm: { width: 120, height: 42, iconSize: 28 },
    md: { width: 160, height: 56, iconSize: 36 },
    lg: { width: 220, height: 78, iconSize: 50 },
    xl: { width: 280, height: 98, iconSize: 64 },
  }[size];

  const textColor = variant === 'white' ? '#FFFFFF' : '#1E242B';
  const graphiteDark = variant === 'white' ? '#E2E8F0' : '#26282B';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 120"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-2xs"
      >
        <defs>
          {/* Degradado Rojo DC (Inspirado en logotipo corporativo oficial) */}
          <linearGradient id="dcRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7F0909" />
            <stop offset="35%" stopColor="#C81E1E" />
            <stop offset="70%" stopColor="#E02424" />
            <stop offset="100%" stopColor="#FF3838" />
          </linearGradient>

          {/* Degradado Grafito para D */}
          <linearGradient id="dcGraphiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={graphiteDark} />
            <stop offset="100%" stopColor={variant === 'white' ? '#CBD5E1' : '#14171A'} />
          </linearGradient>
        </defs>

        {/* Letra "D": Pierna recta izquierda + curva envolvente */}
        <g id="letter-D">
          {/* Tronco vertical en grafito */}
          <path
            d="M 28 15 L 68 15 L 68 95 L 28 95 Z"
            fill="url(#dcGraphiteGradient)"
          />

          {/* Curva exterior del arco de la D con transición a degradado rojo superior */}
          <path
            d="M 68 15 
               C 115 15, 142 38, 142 62
               C 142 80, 122 95, 80 95
               L 68 95
               L 68 76
               C 96 76, 110 68, 110 56
               C 110 42, 94 34, 68 34
               Z"
            fill="url(#dcRedGradient)"
          />

          {/* Sombra de corte interior grafito de la D */}
          <path
            d="M 68 34
               C 92 34, 108 42, 108 55
               C 108 68, 92 76, 68 76
               Z"
            fill={variant === 'white' ? '#0F172A' : '#FFFFFF'}
          />
        </g>

        {/* Letra "C": Arco circular externo grafito con medialuna roja interna */}
        <g id="letter-C">
          {/* Gran cuerpo externo de la C en grafito */}
          <path
            d="M 235 22
               C 215 12, 182 12, 158 32
               C 130 54, 130 84, 156 102
               C 182 120, 222 116, 246 96
               L 220 78
               C 204 90, 182 92, 168 82
               C 152 70, 152 50, 168 38
               C 182 28, 202 30, 218 38
               Z"
            fill="url(#dcGraphiteGradient)"
          />

          {/* Medialuna inferior roja en degradado */}
          <path
            d="M 152 68
               C 152 86, 172 108, 204 108
               C 224 108, 240 100, 246 95
               L 230 76
               C 220 84, 210 88, 198 88
               C 180 88, 168 78, 164 68
               Z"
            fill="url(#dcRedGradient)"
          />
        </g>

        {/* Subtítulo: ASESORES EN SEGUROS */}
        {showSubtitle && (
          <text
            x="140"
            y="118"
            textAnchor="middle"
            fill={textColor}
            fontSize="18"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="2.5px"
          >
            ASESORES EN SEGUROS
          </text>
        )}
      </svg>
    </div>
  );
};
