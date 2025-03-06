interface HeroProps {
  params: Promise<{ slug: string }>
}

const Hero = async (props: HeroProps) => {
  const { slug } = await props.params;

  return (
    <div>{slug}</div>
  );
};

export default Hero;