import { MotiImage } from 'moti';
import { ImageSourcePropType } from 'react-native';

interface AnimatedLogoProps {
  source: ImageSourcePropType;
  size?: number;
}

export function AnimatedLogo({ source, size = 150 }: AnimatedLogoProps) {
  return (
    <MotiImage
      source={source}
      style={{ width: size, height: size }}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 1000,
        delay: 300,
      }}
    />
  );
}
