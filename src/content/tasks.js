// The Periodic Table of ML Tasks: data.
//
// Task names and model counts come from https://huggingface.co/tasks (47 tasks),
// read on 2026-10-11. The counts move every day, so the page shows that date.
// Every real-world case is taken from the abstract or text of the cited source.
// Anything drawn on screen is a toy: a labelled cartoon, never real model output.

export const MODELS_AS_OF = '11 October 2026'

// Columns: what the task DOES (its output verb). Rows: what goes IN.
export const cols = [
  { id: 'classify', name: 'Classify', blurb: 'Pick a label or predict a value' },
  { id: 'locate', name: 'Locate', blurb: 'Find where it is' },
  { id: 'generate', name: 'Generate', blurb: 'Make something new' },
  { id: 'transform', name: 'Transform', blurb: 'Turn A into B' },
  { id: 'retrieve', name: 'Retrieve', blurb: 'Compare, rank, embed' },
  { id: 'act', name: 'Act', blurb: 'Choose actions over time' },
]

export const rows = [
  { id: 'text', name: 'Text', color: '#2b8a6e' },
  { id: 'image', name: 'Image', color: '#c2410c' },
  { id: 'audio', name: 'Audio', color: '#7c3aed' },
  { id: 'video', name: 'Video', color: '#be185d' },
  { id: 'table', name: 'Table', color: '#a16207' },
  { id: 'mixed', name: 'Mixed inputs', color: '#2563eb' },
  { id: 'world', name: 'A world', color: '#475569' },
]

// anim kinds: label, boxes, keypoints, mask, depth, text, rank, vector, gen,
// video, spin, wave, table, regress, agent, edit
export const tasks = [
  // ── Text ──────────────────────────────────────────────────────────────
  {
    sym: 'Tc', name: 'Text Classification', row: 'text', col: 'classify', models: 124091,
    meaning: 'Give a piece of text a label, such as positive or negative, spam or not spam.',
    anim: { kind: 'label', input: '“Great chai, slow service.”', labels: [['mixed', 0.55], ['positive', 0.3], ['negative', 0.15]] },
    case: {
      headline: 'fastText trained on more than 1 billion words in under 10 minutes on a standard multicore CPU.',
      detail: 'It can also classify half a million sentences among 312K classes in less than a minute, and is often on par with deep learning classifiers in accuracy.',
      source: { text: 'Joulin et al., “Bag of Tricks for Efficient Text Classification”, 2016', href: 'https://arxiv.org/abs/1607.01759' },
    },
  },
  {
    sym: 'Zc', name: 'Zero-Shot Classification', row: 'text', col: 'classify', models: 766,
    meaning: 'Label text with categories the model was never trained on, given only their names.',
    anim: { kind: 'label', input: '“The match went to penalties.”', labels: [['sports', 0.7], ['politics', 0.2], ['cooking', 0.1]], tag: 'labels never seen in training' },
    case: {
      headline: 'A 2019 benchmark argued that zero-shot text classification must go beyond topics.',
      detail: 'The aim is to attach an appropriate label to text irrespective of its domain and of the aspect the label describes, such as topic, emotion or event.',
      source: { text: 'Yin, Hay and Roth, “Benchmarking Zero-shot Text Classification”, 2019', href: 'https://arxiv.org/abs/1909.00161' },
    },
  },
  {
    sym: 'Tk', name: 'Token Classification', row: 'text', col: 'locate', models: 31024,
    meaning: 'Label every word or token, for example to find names of people, places and companies.',
    anim: { kind: 'tokens', words: [['Srikanth', 'PER'], ['works', ''], ['at', ''], ['YTT Global', 'ORG'], ['in', ''], ['Hyderabad', 'LOC']] },
    case: {
      headline: 'Named entity recognition without hand-crafted features.',
      detail: 'Lample and colleagues introduced two neural architectures, one using bidirectional LSTMs with conditional random fields, that rely on character-based and unsupervised word representations instead of domain-specific knowledge.',
      source: { text: 'Lample et al., “Neural Architectures for Named Entity Recognition”, 2016', href: 'https://arxiv.org/abs/1603.01360' },
    },
  },
  {
    sym: 'Fm', name: 'Fill-Mask', row: 'text', col: 'generate', models: 18399,
    meaning: 'Predict the hidden word in a sentence from the words around it.',
    anim: { kind: 'text', from: 'The [MASK] was too hot to drink.', to: 'The chai was too hot to drink.' },
    case: {
      headline: 'RoBERTa found that BERT was significantly undertrained.',
      detail: 'With better-chosen hyperparameters and more data, the same masked-language-model recipe could match or exceed every model published after BERT.',
      source: { text: 'Liu et al., “RoBERTa: A Robustly Optimized BERT Pretraining Approach”, 2019', href: 'https://arxiv.org/abs/1907.11692' },
    },
  },
  {
    sym: 'Tg', name: 'Text Generation', row: 'text', col: 'generate', models: 422964,
    meaning: 'Continue a prompt with new text, one token at a time.',
    anim: { kind: 'text', from: 'Once upon a time', to: 'Once upon a time, a stall owner learned to code.' },
    case: {
      headline: 'GPT-3 has 175 billion parameters, 10x more than any previous non-sparse language model.',
      detail: 'It was applied with no gradient updates or fine-tuning, with tasks and few-shot examples specified purely through text.',
      source: { text: 'Brown et al., “Language Models are Few-Shot Learners”, 2020', href: 'https://arxiv.org/abs/2005.14165' },
    },
  },
  {
    sym: 'Ti', name: 'Text-to-Image', row: 'text', col: 'generate', models: 111545,
    meaning: 'Draw a picture that matches a written description.',
    anim: { kind: 'gen', prompt: 'a steaming cup of chai', out: '☕' },
    case: {
      headline: 'Latent diffusion moved image generation into a compressed space.',
      detail: 'Running diffusion models on pixels often consumed hundreds of GPU days. Applying them in the latent space of a pretrained autoencoder, with cross-attention for text conditioning, made high-resolution synthesis far cheaper.',
      source: { text: 'Rombach et al., “High-Resolution Image Synthesis with Latent Diffusion Models”, 2021', href: 'https://arxiv.org/abs/2112.10752' },
    },
  },
  {
    sym: 'Tv', name: 'Text-to-Video', row: 'text', col: 'generate', models: 2826,
    meaning: 'Make a short video from a written description.',
    anim: { kind: 'video', prompt: 'a cat walking', frames: ['🐈', '🐈‍⬛', '🐈', '🐈‍⬛'] },
    case: {
      headline: 'Make-A-Video needs no paired text-video data.',
      detail: 'It learns what the world looks like and how it is described from text-image pairs, and how the world moves from unlabeled video footage.',
      source: { text: 'Singer et al., “Make-A-Video: Text-to-Video Generation without Text-Video Data”, 2022', href: 'https://arxiv.org/abs/2209.14792' },
    },
  },
  {
    sym: 'T3', name: 'Text-to-3D', row: 'text', col: 'generate', models: 140,
    meaning: 'Create a 3D object from a text description.',
    anim: { kind: 'spin', prompt: 'a small teapot', out: '🫖' },
    case: {
      headline: 'DreamFusion made 3D objects without any 3D training data.',
      detail: 'It uses a pretrained 2D text-to-image diffusion model as a prior, optimizing a 3D representation so that renders from every angle look like good images of the prompt.',
      source: { text: 'Poole et al., “DreamFusion: Text-to-3D using 2D Diffusion”, 2022', href: 'https://arxiv.org/abs/2209.14988' },
    },
  },
  {
    sym: 'Ts', name: 'Text-to-Speech', row: 'text', col: 'generate', models: 8302,
    meaning: 'Speak written text aloud in a natural voice.',
    anim: { kind: 'wave', text: 'Welcome to the chai stall', direction: 'out' },
    case: {
      headline: 'Tacotron 2 reached a mean opinion score of 4.53, against 4.58 for professionally recorded speech.',
      detail: 'It maps characters to mel spectrograms with a sequence-to-sequence network, then uses a modified WaveNet as a vocoder to produce audio.',
      source: { text: 'Shen et al., “Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions”, 2017', href: 'https://arxiv.org/abs/1712.05884' },
    },
  },
  {
    sym: 'Tr', name: 'Translation', row: 'text', col: 'transform', models: 18357,
    meaning: 'Convert text from one human language to another.',
    anim: { kind: 'text', from: 'Good morning, friends', to: 'Bonjour, les amis' },
    case: {
      headline: 'No Language Left Behind translates across 200 languages.',
      detail: 'The team reports a 44% BLEU improvement relative to the previous state of the art, evaluated on over 40,000 translation directions with a human-translated benchmark.',
      source: { text: 'NLLB Team, “No Language Left Behind: Scaling Human-Centered Machine Translation”, 2022', href: 'https://arxiv.org/abs/2207.04672' },
    },
  },
  {
    sym: 'Su', name: 'Summarization', row: 'text', col: 'transform', models: 2974,
    meaning: 'Shrink a long document into a short one that keeps the main points.',
    anim: { kind: 'text', from: 'The council confirmed the old bridge will close for repairs next month…', to: 'Old bridge to close for repairs.' },
    case: {
      headline: 'PEGASUS set state-of-the-art ROUGE scores on all 12 summarization datasets it was tested on.',
      detail: 'They span news, science, stories, emails, patents and legislative bills. With only 1,000 examples it also beat previous state of the art on 6 datasets.',
      source: { text: 'Zhang et al., “PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization”, 2019', href: 'https://arxiv.org/abs/1912.08777' },
    },
  },
  {
    sym: 'Qa', name: 'Question Answering', row: 'text', col: 'transform', models: 14194,
    meaning: 'Answer a question using a passage, a document set or the model’s own knowledge.',
    anim: { kind: 'text', from: 'Q: Where did chai originate?', to: 'A: the Indian subcontinent' },
    case: {
      headline: 'DrQA answered open-domain questions using Wikipedia as its only knowledge source.',
      detail: 'It combines a document retriever, using bigram hashing and TF-IDF matching, with a recurrent neural network that detects the answer span in the retrieved paragraphs.',
      source: { text: 'Chen et al., “Reading Wikipedia to Answer Open-Domain Questions”, 2017', href: 'https://arxiv.org/abs/1704.00051' },
    },
  },
  {
    sym: 'Ss', name: 'Sentence Similarity', row: 'text', col: 'retrieve', models: 20402,
    meaning: 'Score how close in meaning two sentences are.',
    anim: { kind: 'rank', query: 'How do I brew tea?', items: [['Steep leaves in hot water', 0.91], ['Train schedule for Monday', 0.08], ['Making a cup of chai', 0.88]] },
    case: {
      headline: 'Sentence-BERT cut the time to find the most similar pair among 10,000 sentences from 65 hours to about 5 seconds.',
      detail: 'Plain BERT had to read both sentences together, about 50 million inference computations. SBERT gives each sentence its own embedding, so they can be compared with cosine similarity.',
      source: { text: 'Reimers and Gurevych, “Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks”, 2019', href: 'https://arxiv.org/abs/1908.10084' },
    },
  },
  {
    sym: 'Rk', name: 'Text Ranking', row: 'text', col: 'retrieve', models: 1408,
    meaning: 'Sort a set of passages from most to least relevant to a query.',
    anim: { kind: 'rank', query: 'best masala chai recipe', items: [['Masala chai in 10 minutes', 0.94], ['History of tea taxes', 0.31], ['Chai spice ratios, explained', 0.82]] },
    case: {
      headline: 'A simple BERT re-ranker topped the MS MARCO passage retrieval leaderboard.',
      detail: 'It beat the previous state of the art by 27% (relative) in MRR@10, and was also state of the art on TREC-CAR.',
      source: { text: 'Nogueira and Cho, “Passage Re-ranking with BERT”, 2019', href: 'https://arxiv.org/abs/1901.04085' },
    },
  },
  {
    sym: 'Fe', name: 'Feature Extraction', row: 'text', col: 'retrieve', models: 21528,
    meaning: 'Turn text into a vector of numbers (an embedding) that other tools can use.',
    anim: { kind: 'vector', input: '“a cup of chai”', dims: 12 },
    case: {
      headline: 'MTEB benchmarked 33 text embedding models on 8 tasks, 58 datasets and 112 languages.',
      detail: 'Its finding: no particular text embedding method dominates across all tasks, so the field has not yet converged on a universal one.',
      source: { text: 'Muennighoff et al., “MTEB: Massive Text Embedding Benchmark”, 2022', href: 'https://arxiv.org/abs/2210.07316' },
    },
  },

  // ── Image ─────────────────────────────────────────────────────────────
  {
    sym: 'Ic', name: 'Image Classification', row: 'image', col: 'classify', models: 29700,
    meaning: 'Say what an image shows, as one label for the whole picture.',
    anim: { kind: 'label', input: '🐱', labels: [['cat', 0.82], ['dog', 0.12], ['fox', 0.06]] },
    case: {
      headline: 'The Vision Transformer cut an image into 16x16 patches and treated them like words.',
      detail: 'A pure transformer, with no convolutions, attained excellent results against state-of-the-art convolutional networks while requiring substantially fewer computational resources to train.',
      source: { text: 'Dosovitskiy et al., “An Image is Worth 16x16 Words”, 2020', href: 'https://arxiv.org/abs/2010.11929' },
    },
  },
  {
    sym: 'Zi', name: 'Zero-Shot Image Classification', row: 'image', col: 'classify', models: 2216,
    meaning: 'Classify images into categories you describe in words, without training on them.',
    anim: { kind: 'label', input: '🦓', labels: [['a photo of a zebra', 0.88], ['a photo of a horse', 0.1], ['a photo of a car', 0.02]], tag: 'categories typed in, not trained' },
    case: {
      headline: 'CLIP matched the original ResNet-50 on ImageNet zero-shot, with none of its 1.28 million training examples.',
      detail: 'It was pre-trained to predict which caption goes with which image, on 400 million image-text pairs from the internet.',
      source: { text: 'Radford et al., “Learning Transferable Visual Models From Natural Language Supervision”, 2021', href: 'https://arxiv.org/abs/2103.00020' },
    },
  },
  {
    sym: 'Od', name: 'Object Detection', row: 'image', col: 'locate', models: 7052,
    meaning: 'Find every object in an image and draw a box around each one.',
    anim: { kind: 'boxes', items: [['🐱', 'cat', 0.9], ['🐶', 'dog', 0.8]] },
    case: {
      headline: 'YOLO processed images in real time at 45 frames per second; Fast YOLO reached 155.',
      detail: 'Fast YOLO still achieved double the mAP of other real-time detectors. YOLO framed detection as one regression problem from full image to boxes and class probabilities.',
      source: { text: 'Redmon et al., “You Only Look Once: Unified, Real-Time Object Detection”, 2015', href: 'https://arxiv.org/abs/1506.02640' },
    },
  },
  {
    sym: 'Zo', name: 'Zero-Shot Object Detection', row: 'image', col: 'locate', models: 140,
    meaning: 'Detect objects named by a text query, even if they were not in the training labels.',
    anim: { kind: 'boxes', items: [['🍕', 'pizza slice', 0.85]], query: 'query: “pizza slice”' },
    case: {
      headline: 'OWL-ViT turned image-text models into open-vocabulary detectors.',
      detail: 'A standard Vision Transformer with contrastive image-text pre-training and end-to-end detection fine-tuning gives zero-shot text-conditioned and one-shot image-conditioned detection.',
      source: { text: 'Minderer et al., “Simple Open-Vocabulary Object Detection with Vision Transformers”, 2022', href: 'https://arxiv.org/abs/2205.06230' },
    },
  },
  {
    sym: 'Kd', name: 'Keypoint Detection', row: 'image', col: 'locate', models: 440,
    meaning: 'Find specific points, such as joints on a body or corners of a face.',
    anim: { kind: 'keypoints' },
    case: {
      headline: 'OpenPose placed first in the inaugural COCO 2016 keypoints challenge.',
      detail: 'It detects the 2D pose of multiple people in real time, irrespective of how many people are in the image, by learning Part Affinity Fields that link body parts to the right person.',
      source: { text: 'Cao et al., “Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields”, 2016', href: 'https://arxiv.org/abs/1611.08050' },
    },
  },
  {
    sym: 'Mg', name: 'Mask Generation', row: 'image', col: 'locate', models: 316,
    meaning: 'Produce a pixel mask for each object or region, often from a click or a box.',
    anim: { kind: 'mask', item: '🍎', label: 'click → mask' },
    case: {
      headline: 'The Segment Anything project built a dataset of over 1 billion masks on 11 million images.',
      detail: 'The model is promptable, so it can transfer zero-shot to new image distributions and tasks, often competitive with prior fully supervised results.',
      source: { text: 'Kirillov et al., “Segment Anything”, 2023', href: 'https://arxiv.org/abs/2304.02643' },
    },
  },
  {
    sym: 'Is', name: 'Image Segmentation', row: 'image', col: 'locate', models: 3632,
    meaning: 'Assign a class to every pixel, such as road, sky, car or cell.',
    anim: { kind: 'mask', item: '🚗', label: 'every pixel gets a class', many: true },
    case: {
      headline: 'U-Net won the ISBI 2015 cell tracking challenge by a large margin.',
      detail: 'It was trained end-to-end from very few annotated images using heavy data augmentation, and segments a 512x512 image in under a second on a recent GPU.',
      source: { text: 'Ronneberger et al., “U-Net: Convolutional Networks for Biomedical Image Segmentation”, 2015', href: 'https://arxiv.org/abs/1505.04597' },
    },
  },
  {
    sym: 'De', name: 'Depth Estimation', row: 'image', col: 'locate', models: 618,
    meaning: 'Estimate how far each pixel is from the camera, from a single image.',
    anim: { kind: 'depth' },
    case: {
      headline: 'MiDaS mixed datasets, including 3D films, to estimate depth from a single image.',
      detail: 'It was tested by zero-shot cross-dataset transfer, on datasets not seen in training, and set a new state of the art for monocular depth estimation.',
      source: { text: 'Ranftl et al., “Towards Robust Monocular Depth Estimation”, 2019', href: 'https://arxiv.org/abs/1907.01341' },
    },
  },
  {
    sym: 'If', name: 'Image Feature Extraction', row: 'image', col: 'retrieve', models: 1623,
    meaning: 'Turn an image into a vector that works for search, clustering and other tasks.',
    anim: { kind: 'vector', input: '🖼️', dims: 12 },
    case: {
      headline: 'DINOv2 produced all-purpose visual features without any fine-tuning or labels.',
      detail: 'The aim is features that work across image distributions and tasks. The authors show that self-supervised methods can produce them if trained on enough curated data.',
      source: { text: 'Oquab et al., “DINOv2: Learning Robust Visual Features without Supervision”, 2023', href: 'https://arxiv.org/abs/2304.07193' },
    },
  },
  {
    sym: 'Ug', name: 'Unconditional Image Generation', row: 'image', col: 'generate', models: 2782,
    meaning: 'Generate new images of a kind of thing, with no prompt at all.',
    anim: { kind: 'gen', prompt: 'no prompt', out: '🌸' },
    case: {
      headline: 'Denoising diffusion reached an FID of 3.17 and an Inception score of 9.46 on unconditional CIFAR10.',
      detail: 'The paper reported this as state-of-the-art image synthesis quality for diffusion models, and sample quality similar to ProgressiveGAN on 256x256 LSUN.',
      source: { text: 'Ho, Jain and Abbeel, “Denoising Diffusion Probabilistic Models”, 2020', href: 'https://arxiv.org/abs/2006.11239' },
    },
  },
  {
    sym: 'Ii', name: 'Image-to-Image', row: 'image', col: 'transform', models: 3977,
    meaning: 'Turn one image into another, such as a sketch into a photo or black and white into colour.',
    anim: { kind: 'edit', from: '🖍️', to: '🌇', label: 'sketch → photo' },
    case: {
      headline: 'pix2pix showed one general recipe for many image translation problems.',
      detail: 'Conditional adversarial networks synthesize photos from label maps, rebuild objects from edge maps and colorize images, learning the loss function as well as the mapping.',
      source: { text: 'Isola et al., “Image-to-Image Translation with Conditional Adversarial Networks”, 2016', href: 'https://arxiv.org/abs/1611.07004' },
    },
  },
  {
    sym: 'It', name: 'Image-to-Text', row: 'image', col: 'transform', models: 2217,
    meaning: 'Describe an image in words, or read the text inside it.',
    anim: { kind: 'text', from: '🍵', to: '“A cup of tea on a table.”' },
    case: {
      headline: 'Show and Tell raised the Pascal BLEU-1 score from 25 to 59, with humans around 69.',
      detail: 'It also improved BLEU-1 on Flickr30k from 56 to 66 and on SBU from 19 to 28, and reached a BLEU-4 of 27.7 on COCO.',
      source: { text: 'Vinyals et al., “Show and Tell: A Neural Image Caption Generator”, 2014', href: 'https://arxiv.org/abs/1411.4555' },
    },
  },
  {
    sym: 'Iv', name: 'Image-to-Video', row: 'image', col: 'generate', models: 1726,
    meaning: 'Animate a still image into a short video clip.',
    anim: { kind: 'video', prompt: 'animate this', frames: ['🌊', '🌊', '🏄', '🏄'] },
    case: {
      headline: 'Stable Video Diffusion is a latent video diffusion model for both text-to-video and image-to-video.',
      detail: 'The paper identifies three training stages: text-to-image pretraining, video pretraining and high-quality video finetuning, and studies how to curate video data.',
      source: { text: 'Blattmann et al., “Stable Video Diffusion”, 2023', href: 'https://arxiv.org/abs/2311.15127' },
    },
  },
  {
    sym: 'I3', name: 'Image-to-3D', row: 'image', col: 'generate', models: 783,
    meaning: 'Rebuild a 3D object, or new views of it, from a single photo.',
    anim: { kind: 'spin', prompt: 'one photo in', out: '🪑' },
    case: {
      headline: 'Zero-1-to-3 changes the camera viewpoint of an object from just one RGB image.',
      detail: 'It uses the geometric priors learned by large diffusion models, trained on a synthetic dataset, and still generalizes zero-shot to out-of-distribution images.',
      source: { text: 'Liu et al., “Zero-1-to-3: Zero-shot One Image to 3D Object”, 2023', href: 'https://arxiv.org/abs/2303.11328' },
    },
  },

  // ── Audio ─────────────────────────────────────────────────────────────
  {
    sym: 'Ac', name: 'Audio Classification', row: 'audio', col: 'classify', models: 5082,
    meaning: 'Say what a sound is: a word, a dog bark, a genre of music.',
    anim: { kind: 'wave', text: '', labels: [['dog bark', 0.8], ['siren', 0.15], ['speech', 0.05]], direction: 'label' },
    case: {
      headline: 'The Audio Spectrogram Transformer reached 0.485 mAP on AudioSet.',
      detail: 'It is the first convolution-free, purely attention-based audio classifier, and also scored 95.6% accuracy on ESC-50 and 98.1% on Speech Commands V2.',
      source: { text: 'Gong, Chung and Glass, “AST: Audio Spectrogram Transformer”, 2021', href: 'https://arxiv.org/abs/2104.01778' },
    },
  },
  {
    sym: 'As', name: 'Automatic Speech Recognition', row: 'audio', col: 'transform', models: 37573,
    meaning: 'Transcribe spoken audio into written text.',
    anim: { kind: 'wave', text: 'two teas, please', direction: 'in' },
    case: {
      headline: 'Whisper was trained on 680,000 hours of multilingual, multitask audio.',
      detail: 'The resulting models generalize well to standard benchmarks, often competitive with fully supervised results in a zero-shot setting, and approach human accuracy and robustness.',
      source: { text: 'Radford et al., “Robust Speech Recognition via Large-Scale Weak Supervision”, 2022', href: 'https://arxiv.org/abs/2212.04356' },
    },
  },
  {
    sym: 'Aa', name: 'Audio-to-Audio', row: 'audio', col: 'transform', models: 1668,
    meaning: 'Turn one sound into another, such as separating vocals from a song or removing noise.',
    anim: { kind: 'wave', text: '', labels: [['vocals', 1], ['drums', 1], ['bass', 1]], direction: 'split' },
    case: {
      headline: 'Hybrid Demucs won the Music Demixing Challenge 2021.',
      detail: 'It separates music into sources by working on both the spectrogram and the waveform, and improved the signal-to-distortion ratio by 1.4 dB across all sources on MusDB HQ.',
      source: { text: 'Défossez, “Hybrid Spectrogram and Waveform Source Separation”, 2021', href: 'https://arxiv.org/abs/2111.03600' },
    },
  },

  // ── Video ─────────────────────────────────────────────────────────────
  {
    sym: 'Vc', name: 'Video Classification', row: 'video', col: 'classify', models: 2241,
    meaning: 'Say what is happening in a video clip, such as an action or an event.',
    anim: { kind: 'video', prompt: 'what is the action?', frames: ['🏃', '🏃‍♂️', '🏃', '🏃‍♂️'], labels: [['running', 0.86], ['walking', 0.1], ['dancing', 0.04]] },
    case: {
      headline: 'The Kinetics dataset has 400 human action classes, with at least 400 clips for each.',
      detail: 'Each clip lasts around 10 seconds and comes from a different YouTube video. The actions cover human-object and human-human interactions.',
      source: { text: 'Kay et al., “The Kinetics Human Action Video Dataset”, 2017', href: 'https://arxiv.org/abs/1705.06950' },
    },
  },
  {
    sym: 'Vv', name: 'Video-to-Video', row: 'video', col: 'generate', models: 367,
    meaning: 'Turn one video into another, such as a segmentation map into a photorealistic scene.',
    anim: { kind: 'edit', from: '🟦', to: '🏙️', label: 'masks → video', video: true },
    case: {
      headline: 'vid2vid turns a sequence of segmentation masks into a photorealistic video.',
      detail: 'Applying image-to-image models frame by frame gives temporally incoherent video, so the authors model temporal dynamics explicitly.',
      source: { text: 'Wang et al., “Video-to-Video Synthesis”, 2018', href: 'https://arxiv.org/abs/1808.06601' },
    },
  },

  // ── Table ─────────────────────────────────────────────────────────────
  {
    sym: 'Tb', name: 'Tabular Classification', row: 'table', col: 'classify', models: 1104,
    meaning: 'Predict a category for each row of a spreadsheet-like table.',
    anim: { kind: 'table', mode: 'class' },
    case: {
      headline: 'TabPFN classifies small tabular datasets in less than a second, with no hyperparameter tuning.',
      detail: 'On 18 OpenML-CC18 datasets it outperformed boosted trees and matched complex AutoML systems with up to 230x speedup, or 5,700x on a GPU.',
      source: { text: 'Hollmann et al., “TabPFN: A Transformer That Solves Small Tabular Classification Problems in a Second”, 2022', href: 'https://arxiv.org/abs/2207.01848' },
    },
  },
  {
    sym: 'Rg', name: 'Tabular Regression', row: 'table', col: 'classify', models: 546,
    meaning: 'Predict a number for each row of a table, such as a price or a duration.',
    anim: { kind: 'regress' },
    case: {
      headline: 'Tree-based models remain state of the art on medium-sized tabular data.',
      detail: 'Across a standard set of 45 datasets, trees stayed ahead of deep learning at about 10,000 samples, even without counting their speed advantage.',
      source: { text: 'Grinsztajn, Oyallon and Varoquaux, “Why do tree-based models still outperform deep learning on tabular data?”, 2022', href: 'https://arxiv.org/abs/2207.08815' },
    },
  },
  {
    sym: 'Tq', name: 'Table Question Answering', row: 'table', col: 'transform', models: 196,
    meaning: 'Answer a question by reading, and sometimes adding up, cells in a table.',
    anim: { kind: 'table', mode: 'qa' },
    case: {
      headline: 'TAPAS raised the state of the art on SQA from 55.1 to 67.2.',
      detail: 'It answers questions over tables by selecting cells and optionally applying an aggregation, without generating logical forms. It extends BERT to encode tables.',
      source: { text: 'Herzig et al., “TAPAS: Weakly Supervised Table Parsing via Pre-training”, 2020', href: 'https://arxiv.org/abs/2004.02349' },
    },
  },

  // ── Mixed inputs ──────────────────────────────────────────────────────
  {
    sym: 'Vq', name: 'Visual Question Answering', row: 'mixed', col: 'transform', models: 911,
    meaning: 'Answer a question about an image.',
    anim: { kind: 'text', from: '🖼️ + “How many cups?”', to: '“Two.”' },
    case: {
      headline: 'The VQA dataset has about 0.25M images, 0.76M questions and 10M answers.',
      detail: 'The task asks for an accurate natural-language answer to a free-form, open-ended question about an image, which needs more detailed understanding than captioning.',
      source: { text: 'Antol et al., “VQA: Visual Question Answering”, 2015', href: 'https://arxiv.org/abs/1505.00468' },
    },
  },
  {
    sym: 'Dq', name: 'Document Question Answering', row: 'mixed', col: 'transform', models: 250,
    meaning: 'Answer questions about a scanned page, form or invoice, using its text and layout.',
    anim: { kind: 'text', from: '🧾 + “What is the total?”', to: '“₹ 420”' },
    case: {
      headline: 'DocVQA has 50,000 questions on more than 12,000 document images, and a large human-machine gap.',
      detail: 'Human accuracy was 94.36%, and the baselines were far behind, especially on questions that depend on the structure of the document.',
      source: { text: 'Mathew, Karatzas and Jawahar, “DocVQA: A Dataset for VQA on Document Images”, 2020', href: 'https://arxiv.org/abs/2007.00398' },
    },
  },
  {
    sym: 'Im', name: 'Image-Text-to-Text', row: 'mixed', col: 'transform', models: 42033,
    meaning: 'Chat about an image: take a picture plus a prompt and reply in text.',
    anim: { kind: 'text', from: '🖼️ + “What is unusual here?”', to: '“A cow is on the road.”' },
    case: {
      headline: 'LLaVA reached an 85.1% relative score compared with GPT-4 on a synthetic multimodal instruction-following set.',
      detail: 'It connects a vision encoder to an LLM and was trained on instruction data generated by language-only GPT-4. Combined with GPT-4, it set 92.53% on Science QA.',
      source: { text: 'Liu et al., “Visual Instruction Tuning”, 2023', href: 'https://arxiv.org/abs/2304.08485' },
    },
  },
  {
    sym: 'Vt', name: 'Video-Text-to-Text', row: 'mixed', col: 'transform', models: 510,
    meaning: 'Answer questions about a video, or describe it.',
    anim: { kind: 'text', from: '🎞️ + “What happens next?”', to: '“The kettle boils over.”' },
    case: {
      headline: 'Video-LLaVA beat Video-ChatGPT by 5.8%, 9.9%, 18.6% and 10.1% on four video benchmarks.',
      detail: 'The benchmarks were MSRVTT, MSVD, TGIF and ActivityNet. It unifies image and video representations in the language feature space before projection.',
      source: { text: 'Lin et al., “Video-LLaVA”, 2023', href: 'https://arxiv.org/abs/2311.10122' },
    },
  },
  {
    sym: 'At', name: 'Audio-Text-to-Text', row: 'mixed', col: 'transform', models: 399,
    meaning: 'Take audio plus a prompt and reply in text, for example “what instrument is this?”.',
    anim: { kind: 'text', from: '🔊 + “Which instrument?”', to: '“A sitar.”' },
    case: {
      headline: 'Qwen-Audio scaled audio-language pre-training to over 30 tasks.',
      detail: 'It covers audio types such as human speech, natural sounds, music and songs, aiming at universal audio understanding.',
      source: { text: 'Chu et al., “Qwen-Audio”, 2023', href: 'https://arxiv.org/abs/2311.07919' },
    },
  },
  {
    sym: 'Ie', name: 'Image-Text-to-Image', row: 'mixed', col: 'generate', models: 740,
    meaning: 'Edit an image by following a written instruction.',
    anim: { kind: 'edit', from: '🌞', to: '🌙', label: '“make it night”' },
    case: {
      headline: 'InstructPix2Pix edits an image by following a written instruction.',
      detail: 'Its training data was generated by combining GPT-3 and Stable Diffusion, and the diffusion model then edits real images in a single forward pass.',
      source: { text: 'Brooks, Holynski and Efros, “InstructPix2Pix”, 2022', href: 'https://arxiv.org/abs/2211.09800' },
    },
  },
  {
    sym: 'Ev', name: 'Image-Text-to-Video', row: 'mixed', col: 'generate', models: 342,
    meaning: 'Make a video from a starting image and a text description of the motion.',
    anim: { kind: 'video', prompt: '“make the tea steam”', frames: ['🍵', '🍵', '☕', '☕'] },
    case: {
      headline: 'CogVideoX generates 10-second videos at 16 fps and 768 by 1360 pixels from text.',
      detail: 'The abstract describes a text-to-video model; I did not find an image-conditioned result in it, so treat this as the closest verified source for the task.',
      source: { text: 'Yang et al., “CogVideoX: Text-to-Video Diffusion Models with An Expert Transformer”, 2024', href: 'https://arxiv.org/abs/2408.06072' },
    },
  },
  {
    sym: 'Vd', name: 'Visual Document Retrieval', row: 'mixed', col: 'retrieve', models: 189,
    meaning: 'Find the document pages that answer a query by looking at the page images themselves.',
    anim: { kind: 'rank', query: 'Q3 revenue chart', items: [['page 12: revenue chart', 0.93], ['page 3: company photo', 0.12], ['page 9: revenue table', 0.8]] },
    case: {
      headline: 'ColPali retrieves document pages by embedding the page images directly.',
      detail: 'The authors built the ViDoRe benchmark and report that ColPali largely outperforms modern text-extraction retrieval pipelines while being simpler and faster.',
      source: { text: 'Faysse et al., “ColPali: Efficient Document Retrieval with Vision Language Models”, 2024', href: 'https://arxiv.org/abs/2407.01449' },
    },
  },
  {
    sym: 'Ax', name: 'Any-to-Any', row: 'mixed', col: 'generate', models: 11680,
    meaning: 'Accept and produce any mix of text, images, audio and video in one model.',
    anim: { kind: 'text', from: '🖼️ + 🔊 + “write”', to: '📝 + 🖼️ + 🔊', many: true },
    case: {
      headline: 'NExT-GPT is an end-to-end any-to-any multimodal LLM.',
      detail: 'It connects an LLM with multimodal adaptors and different diffusion decoders, so it can both understand and produce content in several modalities.',
      source: { text: 'Wu et al., “NExT-GPT: Any-to-Any Multimodal LLM”, 2023', href: 'https://arxiv.org/abs/2309.05519' },
    },
  },

  // ── A world ───────────────────────────────────────────────────────────
  {
    sym: 'Rl', name: 'Reinforcement Learning', row: 'world', col: 'act', models: 78435,
    meaning: 'Learn what to do by trying actions and getting rewards, with no labelled answers.',
    anim: { kind: 'agent' },
    case: {
      headline: 'AlphaZero reached superhuman play in chess, shogi and Go within 24 hours of self-play.',
      detail: 'It started from random play, was given no domain knowledge except the game rules, and convincingly defeated a world-champion program in each game.',
      source: { text: 'Silver et al., “Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm”, 2017', href: 'https://arxiv.org/abs/1712.01815' },
    },
  },
]

export const taskCount = tasks.length
export const modelTotal = tasks.reduce((n, t) => n + t.models, 0)
