import { 
  AppShell,
  Container,
  Title,
  Text,
  Grid,
  Card,
  Button,
  Group,
  SimpleGrid,
  ThemeIcon,
  rem,
  Image,
  Paper,
  MantineProvider,
  Box
} from '@mantine/core';
import { 
  IconMicroscope, 
  IconHeartRateMonitor, 
  IconStethoscope,
  IconArrowRight,
  IconChartBar,
  IconDeviceAnalytics,
  IconUpload,
  IconPhoto
} from '@tabler/icons-react';
import classes from './App.module.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useState, useRef } from 'react';
import { ChatBot } from './components/ChatBot';

const features = [
  {
    icon: IconMicroscope,
    title: 'Transforming Medical Imaging',
    description: 'Advanced AI algorithms for accurate medical image analysis and early disease detection.',
  },
  {
    icon: IconHeartRateMonitor,
    title: 'Seamless Integration',
    description: 'Easy integration with existing healthcare systems and medical software.',
  },
  {
    icon: IconStethoscope,
    title: 'Enhanced Patient Care',
    description: 'Faster diagnosis and improved patient outcomes through AI-assisted analysis.',
  },
];

const stats = [
  { value: '95%', label: 'Detection Accuracy' },
  { value: '4s', label: 'Response Time' },
  { value: 'Continuous', label: 'Model Improvement' },
];

const testimonials = [
  {
    content: "The AI analysis system has dramatically improved our diagnostic accuracy and efficiency.",
    author: "Dr. Sarah Chen",
    role: "Chief Radiologist"
  },
  {
    content: "Implementation was seamless and the results have been remarkable for our practice.",
    author: "Dr. Michael Roberts",
    role: "Medical Director"
  }
];

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please select an image first');
      return;
    }

    setAnalyzing(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setResults(result);
    } catch (error) {
      setResults({ error: 'Analysis failed. Please try again.' });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        padding={0}
      >
        <Navbar />
        <AppShell.Main>
          {/* Hero Section */}
          <div className={classes.hero}>
            <Container size="lg">
              <div className={classes.heroContent}>
                <Title className={classes.title}>
                  Revolutionizing Disease Detection with AI Technology
                </Title>
                <Text className={classes.description}>
                  Transform your medical imaging workflow with cutting-edge AI solutions that provide rapid, accurate disease detection and analysis.
                </Text>
                <Group mt={30}>
                  <Button size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="default">
                    Learn More
                  </Button>
                </Group>
              </div>
            </Container>
          </div>

          {/* Features Section */}
          <Container size="lg" py={80}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={50}>
              {features.map((feature, index) => (
                <Card key={index} shadow="md" radius="md" className={classes.featureCard} padding="xl">
                  <ThemeIcon
                    size={56}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                  >
                    <feature.icon style={{ width: rem(26), height: rem(26) }} />
                  </ThemeIcon>
                  <Text fz="lg" fw={500} mt="md">
                    {feature.title}
                  </Text>
                  <Text fz="sm" c="dimmed" mt="sm">
                    {feature.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Container>

          {/* Multi-Modal Analysis Section */}
          <div className={classes.section}>
            <Container size="lg">
              <Grid gutter={50} align="center">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Title order={2} className={classes.sectionTitle}>
                    Revolutionizing Diagnostics with Multi-Modal Medical Image Analysis
                  </Title>
                  <Text c="dimmed" mt="md">
                    Our advanced AI system analyzes multiple types of medical images simultaneously, providing comprehensive insights for more accurate diagnoses.
                  </Text>
                  <Button 
                    variant="gradient" 
                    gradient={{ from: 'blue', to: 'cyan' }}
                    mt="xl"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Explore Features
                  </Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2940"
                    radius="md"
                    className={classes.image}
                    alt="Medical Analysis"
                  />
                </Grid.Col>
              </Grid>
            </Container>
          </div>

          {/* Stats Section */}
          <Container size="lg" py={80}>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
              {stats.map((stat, index) => (
                <Paper key={index} withBorder p="md" radius="md">
                  <Text ta="center" fz="xl" fw={700}>
                    {stat.value}
                  </Text>
                  <Text ta="center" fz="sm" c="dimmed" mt={5}>
                    {stat.label}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>

          {/* Precision Section */}
          <div className={classes.section}>
            <Container size="lg">
              <Title order={2} ta="center" className={classes.sectionTitle}>
                Ensuring Precision: Our Commitment to Accuracy in Disease Detection
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30} mt={50}>
                <div className={classes.precisionItem}>
                  <ThemeIcon
                    size={40}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                  >
                    <IconDeviceAnalytics size={20} />
                  </ThemeIcon>
                  <Text size="lg" mt="sm" fw={500}>Advanced Pattern Recognition</Text>
                  <Text c="dimmed" size="sm">
                    Utilizing deep learning algorithms for precise abnormality detection
                  </Text>
                </div>
                <div className={classes.precisionItem}>
                  <ThemeIcon
                    size={40}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                  >
                    <IconChartBar size={20} />
                  </ThemeIcon>
                  <Text size="lg" mt="sm" fw={500}>Comprehensive Analysis</Text>
                  <Text c="dimmed" size="sm">
                    Multi-dimensional analysis of medical imaging data
                  </Text>
                </div>
              </SimpleGrid>
            </Container>
          </div>

          {/* Testimonials Section */}
          <Container size="lg" py={80}>
            <Title order={2} ta="center" className={classes.sectionTitle} mb={50}>
              Customer Testimonials
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30}>
              {testimonials.map((testimonial, index) => (
                <Card key={index} shadow="md" radius="md" padding="xl">
                  <Text fz="lg" style={{ fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Text>
                  <Text fw={500} mt="md">
                    {testimonial.author}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {testimonial.role}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Container>

          {/* CTA Section */}
          <div className={classes.cta}>
            <Container size="lg">
              <Title order={2} ta="center" c="white">
                Discover MedScan.AI Today!
              </Title>
              <Text c="white" ta="center" mt="md">
                Join healthcare providers worldwide in revolutionizing medical diagnostics
              </Text>
              <Group justify="center" mt={30}>
                <Button size="lg" variant="white">
                  Get Started
                </Button>
              </Group>
            </Container>
          </div>

          {/* Image Upload and Analysis Section */}
          <Container size="lg" className={classes.mainContainer}>
            <Paper shadow="sm" radius="md" className={classes.container}>
              <Title order={1} className={classes.title}>Medical Image Analysis System</Title>
              
              <Box className={classes.uploadSection}>
                <label htmlFor="imageInput" className={classes.hiddenInput}>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*,.dcm"
                    onChange={handleFileChange}
                    className={classes.hiddenInput}
                    ref={fileInputRef}
                    aria-label="Upload medical image"
                    title="Upload medical image"
                  />
                </label>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  leftSection={<IconUpload size={20} />}
                  size="md"
                  className={classes.uploadButton}
                >
                  Select Image
                </Button>
              </Box>

              {previewUrl && (
                <Paper shadow="sm" p="md" mt="md" className={classes.previewSection}>
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fit="contain"
                    className={classes.previewImage}
                  />
                  <Group justify="center" mt="md">
                    <Button
                      onClick={handleAnalyze}
                      loading={analyzing}
                      leftSection={<IconPhoto size={20} />}
                      size="md"
                      className={classes.analyzeButton}
                    >
                      {analyzing ? 'Analyzing...' : 'Analyze Image'}
                    </Button>
                  </Group>
                </Paper>
              )}

              {results && (
                <Paper shadow="sm" p="md" mt="md" className={classes.resultsSection}>
                  <Title order={3}>Analysis Results:</Title>
                  {results.error ? (
                    <Text color="red">{results.error}</Text>
                  ) : (
                    <pre className={classes.resultsJson}>
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  )}
                </Paper>
              )}
            </Paper>
          </Container>
          <ChatBot />
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  );
}
