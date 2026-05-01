import type { CertificateData, TemplateId } from '@/src/types';
import FormalTemplate from './FormalTemplate';
import ModernTemplate from './ModernTemplate';
import ElegantTemplate from './ElegantTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import NavyTemplate from './NavyTemplate';
import GreenTemplate from './GreenTemplate';
import DarkTemplate from './DarkTemplate';
import GradientTemplate from './GradientTemplate';
import AcademicTemplate from './AcademicTemplate';
import RibbonTemplate from './RibbonTemplate';
import CertificateGoldTemplate from './CertificateGoldTemplate';
// Formal
import RoyalBlueTemplate from './RoyalBlueTemplate';
import FormalRedTemplate from './FormalRedTemplate';
import FormalGreenTemplate from './FormalGreenTemplate';
import FormalPurpleTemplate from './FormalPurpleTemplate';
import FormalTealTemplate from './FormalTealTemplate';
// Akademik
import DiplomaTemplate from './DiplomaTemplate';
// Layout Unik
import DiagonalSplitTemplate from './DiagonalSplitTemplate';
import FullBgTemplate from './FullBgTemplate';
import HorizontalBandTemplate from './HorizontalBandTemplate';
import OrnateFrameTemplate from './OrnateFrameTemplate';
import SplitColorTemplate from './SplitColorTemplate';
import CircleSealTemplate from './CircleSealTemplate';
import TriangleAccentTemplate from './TriangleAccentTemplate';
import WaveTemplate from './WaveTemplate';
import TypographyTemplate from './TypographyTemplate';
import IslamicTemplate from './IslamicTemplate';
import GraduationTemplate from './GraduationTemplate';
import ScholarTemplate from './ScholarTemplate';
import UniversitySealTemplate from './UniversitySealTemplate';
import AcademicBlueTemplate from './AcademicBlueTemplate';
import AcademicMaroonTemplate from './AcademicMaroonTemplate';
// Korporat
import CorporateGrayTemplate from './CorporateGrayTemplate';
import CorporateBlueTemplate from './CorporateBlueTemplate';
import CorporateOrangeTemplate from './CorporateOrangeTemplate';
import TechDarkTemplate from './TechDarkTemplate';
import StartupTemplate from './StartupTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
// Kreatif
import WatercolorTemplate from './WatercolorTemplate';
import GeometricTemplate from './GeometricTemplate';
import PastelTemplate from './PastelTemplate';
import ColorfulTemplate from './ColorfulTemplate';
import RetroTemplate from './RetroTemplate';
import NeonPopTemplate from './NeonPopTemplate';
import ArtisticTemplate from './ArtisticTemplate';
import BohemianTemplate from './BohemianTemplate';
// Gelap
import DarkGoldTemplate from './DarkGoldTemplate';
import DarkBlueTemplate from './DarkBlueTemplate';
import DarkGreenTemplate from './DarkGreenTemplate';
import DarkRedTemplate from './DarkRedTemplate';
// Ornamental
import OrnateGoldTemplate from './OrnateGoldTemplate';
import OrnateBlueTemplate from './OrnateBlueTemplate';
import OrnateGreenTemplate from './OrnateGreenTemplate';
import FloralTemplate from './FloralTemplate';
import BaroqueTemplate from './BaroqueTemplate';
import VictorianTemplate from './VictorianTemplate';
import CelticTemplate from './CelticTemplate';
import MandalaTemplate from './MandalaTemplate';
// Vintage
import VintageBrownTemplate from './VintageBrownTemplate';
import VintageSepiaTemplate from './VintageSepiaTemplate';
import VintageRedTemplate from './VintageRedTemplate';
import AntiqueTemplate from './AntiqueTemplate';
import Retro70sTemplate from './Retro70sTemplate';
// Sport & Achievement
import SportBlueTemplate from './SportBlueTemplate';
import SportRedTemplate from './SportRedTemplate';
import ChampionTemplate from './ChampionTemplate';
import TrophyTemplate from './TrophyTemplate';
import AchievementTemplate from './AchievementTemplate';
// Pelatihan
import TrainingBlueTemplate from './TrainingBlueTemplate';
import TrainingGreenTemplate from './TrainingGreenTemplate';
import WorkshopTemplate from './WorkshopTemplate';
import SeminarTemplate from './SeminarTemplate';
import BootcampTemplate from './BootcampTemplate';

interface Props {
  templateId: TemplateId;
  data: CertificateData;
  scale?: number;
}

export default function CertificateRenderer({ templateId, data, scale = 1 }: Props) {
  switch (templateId) {
    // Original templates
    case 'formal':            return <FormalTemplate data={data} scale={scale} />;
    case 'modern':            return <ModernTemplate data={data} scale={scale} />;
    case 'elegant':           return <ElegantTemplate data={data} scale={scale} />;
    case 'minimalist':        return <MinimalistTemplate data={data} scale={scale} />;
    case 'navy':              return <NavyTemplate data={data} scale={scale} />;
    case 'green':             return <GreenTemplate data={data} scale={scale} />;
    case 'dark':              return <DarkTemplate data={data} scale={scale} />;
    case 'gradient':          return <GradientTemplate data={data} scale={scale} />;
    case 'academic':          return <AcademicTemplate data={data} scale={scale} />;
    case 'ribbon':            return <RibbonTemplate data={data} scale={scale} />;
    case 'certificate_gold':  return <CertificateGoldTemplate data={data} scale={scale} />;
    // Formal
    case 'royal_blue':        return <RoyalBlueTemplate data={data} scale={scale} />;
    case 'formal_red':        return <FormalRedTemplate data={data} scale={scale} />;
    case 'formal_green':      return <FormalGreenTemplate data={data} scale={scale} />;
    case 'formal_purple':     return <FormalPurpleTemplate data={data} scale={scale} />;
    case 'formal_teal':       return <FormalTealTemplate data={data} scale={scale} />;
    // Akademik
    case 'diploma':           return <DiplomaTemplate data={data} scale={scale} />;
    case 'graduation':        return <GraduationTemplate data={data} scale={scale} />;
    case 'scholar':           return <ScholarTemplate data={data} scale={scale} />;
    case 'university_seal':   return <UniversitySealTemplate data={data} scale={scale} />;
    case 'academic_blue':     return <AcademicBlueTemplate data={data} scale={scale} />;
    case 'academic_maroon':   return <AcademicMaroonTemplate data={data} scale={scale} />;
    // Korporat
    case 'corporate_gray':    return <CorporateGrayTemplate data={data} scale={scale} />;
    case 'corporate_blue':    return <CorporateBlueTemplate data={data} scale={scale} />;
    case 'corporate_orange':  return <CorporateOrangeTemplate data={data} scale={scale} />;
    case 'tech_dark':         return <TechDarkTemplate data={data} scale={scale} />;
    case 'startup':           return <StartupTemplate data={data} scale={scale} />;
    case 'professional':      return <ProfessionalTemplate data={data} scale={scale} />;
    // Kreatif
    case 'watercolor':        return <WatercolorTemplate data={data} scale={scale} />;
    case 'geometric':         return <GeometricTemplate data={data} scale={scale} />;
    case 'pastel':            return <PastelTemplate data={data} scale={scale} />;
    case 'colorful':          return <ColorfulTemplate data={data} scale={scale} />;
    case 'retro':             return <RetroTemplate data={data} scale={scale} />;
    case 'neon_pop':          return <NeonPopTemplate data={data} scale={scale} />;
    case 'artistic':          return <ArtisticTemplate data={data} scale={scale} />;
    case 'bohemian':          return <BohemianTemplate data={data} scale={scale} />;
    // Gelap
    case 'dark_gold':         return <DarkGoldTemplate data={data} scale={scale} />;
    case 'dark_blue':         return <DarkBlueTemplate data={data} scale={scale} />;
    case 'dark_green':        return <DarkGreenTemplate data={data} scale={scale} />;
    case 'dark_red':          return <DarkRedTemplate data={data} scale={scale} />;
    // Ornamental
    case 'ornate_gold':       return <OrnateGoldTemplate data={data} scale={scale} />;
    case 'ornate_blue':       return <OrnateBlueTemplate data={data} scale={scale} />;
    case 'ornate_green':      return <OrnateGreenTemplate data={data} scale={scale} />;
    case 'floral':            return <FloralTemplate data={data} scale={scale} />;
    case 'baroque':           return <BaroqueTemplate data={data} scale={scale} />;
    case 'victorian':         return <VictorianTemplate data={data} scale={scale} />;
    case 'celtic':            return <CelticTemplate data={data} scale={scale} />;
    case 'mandala':           return <MandalaTemplate data={data} scale={scale} />;
    // Vintage
    case 'vintage_brown':     return <VintageBrownTemplate data={data} scale={scale} />;
    case 'vintage_sepia':     return <VintageSepiaTemplate data={data} scale={scale} />;
    case 'vintage_red':       return <VintageRedTemplate data={data} scale={scale} />;
    case 'antique':           return <AntiqueTemplate data={data} scale={scale} />;
    case 'retro_70s':         return <Retro70sTemplate data={data} scale={scale} />;
    // Sport & Achievement
    case 'sport_blue':        return <SportBlueTemplate data={data} scale={scale} />;
    case 'sport_red':         return <SportRedTemplate data={data} scale={scale} />;
    case 'champion':          return <ChampionTemplate data={data} scale={scale} />;
    case 'trophy':            return <TrophyTemplate data={data} scale={scale} />;
    case 'achievement':       return <AchievementTemplate data={data} scale={scale} />;
    // Pelatihan
    case 'training_blue':     return <TrainingBlueTemplate data={data} scale={scale} />;
    case 'training_green':    return <TrainingGreenTemplate data={data} scale={scale} />;
    case 'workshop':          return <WorkshopTemplate data={data} scale={scale} />;
    case 'seminar':           return <SeminarTemplate data={data} scale={scale} />;
    case 'bootcamp':          return <BootcampTemplate data={data} scale={scale} />;
    // Layout Unik
    case 'diagonal_split':    return <DiagonalSplitTemplate data={data} scale={scale} />;
    case 'full_bg':           return <FullBgTemplate data={data} scale={scale} />;
    case 'horizontal_band':   return <HorizontalBandTemplate data={data} scale={scale} />;
    case 'ornate_frame':      return <OrnateFrameTemplate data={data} scale={scale} />;
    case 'split_color':       return <SplitColorTemplate data={data} scale={scale} />;
    case 'circle_seal':       return <CircleSealTemplate data={data} scale={scale} />;
    case 'triangle_accent':   return <TriangleAccentTemplate data={data} scale={scale} />;
    case 'wave':              return <WaveTemplate data={data} scale={scale} />;
    case 'typography':        return <TypographyTemplate data={data} scale={scale} />;
    case 'islamic':           return <IslamicTemplate data={data} scale={scale} />;
    default:                  return <FormalTemplate data={data} scale={scale} />;
  }
}
