import { renderToFile, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  title: { fontSize: 12, color: '#2563eb', marginBottom: 8, fontWeight: 'bold' },
  contactInfo: { fontSize: 9, color: '#555', marginBottom: 2 },
  section: { marginTop: 15, marginBottom: 5 },
  sectionTitle: { fontSize: 12, color: '#111', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #e4e4e7', paddingBottom: 4, marginBottom: 8 },
  itemContainer: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 10, fontWeight: 'bold', color: '#111' },
  itemDate: { fontSize: 9, color: '#555' },
  itemSub: { fontSize: 9, fontStyle: 'italic', color: '#333', marginBottom: 3 },
  text: { fontSize: 9, color: '#333', lineHeight: 1.5, marginBottom: 2 },
  bullet: { width: 10, fontSize: 9 },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  skillsText: { fontSize: 9, color: '#333', lineHeight: 1.5 },
  bold: { fontWeight: 'bold' }
});

const Bullet = ({ children }) => (
  React.createElement(View, { style: styles.bulletRow },
    React.createElement(Text, { style: styles.bullet }, '•'),
    React.createElement(Text, { style: styles.text }, children)
  )
);

const Resume = () => (
  React.createElement(Document, null,
    React.createElement(Page, { size: "A4", style: styles.page },
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.name }, 'Derek David'),
        React.createElement(Text, { style: styles.title }, 'Machine Learning Engineer & Full-Stack Developer'),
        React.createElement(Text, { style: styles.contactInfo }, 'derekmiracledavid@gmail.com | +234 708 602 0081'),
        React.createElement(Text, { style: styles.contactInfo }, 'linkedin.com/in/derek-dv | github.com/derek-dv')
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Professional Summary'),
        React.createElement(Text, { style: styles.text },
          'Machine Learning Engineer with a strong full-stack foundation. With 4+ years of production experience designing scalable web systems, I leverage my expertise in distributed architectures and data pipelines to productionize deep learning models and AI-driven applications.'
        )
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Technical Skills'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'Machine Learning: '), 'PyTorch, CNNs, LSTMs, Deep Learning, LLM APIs (Gemini)'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'Languages: '), 'Python, TypeScript, JavaScript (ES6+)'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'Data & Backend: '), 'Node.js, Express.js, PostgreSQL, MongoDB, Redis, Prisma, REST, GraphQL'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'Messaging: '), 'Kafka, RabbitMQ, BullMQ'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'DevOps: '), 'Docker, Kubernetes, AWS, Azure, CI/CD, GitHub Actions'),
        React.createElement(Text, { style: styles.skillsText }, React.createElement(Text, { style: styles.bold }, 'Frontend: '), 'React.js, Next.js 15, Vue.js, Tailwind CSS')
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Professional Experience'),
        
        React.createElement(View, { style: styles.itemContainer },
          React.createElement(View, { style: styles.itemHeader },
            React.createElement(Text, { style: styles.itemTitle }, 'Full-Stack Developer'),
            React.createElement(Text, { style: styles.itemDate }, 'Aug 2025 – Present')
          ),
          React.createElement(Text, { style: styles.itemSub }, 'Praix Development LTD'),
          React.createElement(Bullet, null, 'Spearheading development of scalable, data-intensive web applications (Next.js 15 / Node.js).'),
          React.createElement(Bullet, null, 'Integrating an AI model into PraixAI across the API layer connecting model outputs.')
        ),

        React.createElement(View, { style: styles.itemContainer },
          React.createElement(View, { style: styles.itemHeader },
            React.createElement(Text, { style: styles.itemTitle }, 'Full-Stack Developer'),
            React.createElement(Text, { style: styles.itemDate }, 'Feb 2025 – Aug 2025')
          ),
          React.createElement(Text, { style: styles.itemSub }, 'Connectivo AB'),
          React.createElement(Bullet, null, 'Architected React and Vue.js applications that increased user engagement by 30%.'),
          React.createElement(Bullet, null, 'Streamlined frontend-to-backend data flow, achieving a 28% improvement in application performance.')
        ),

        React.createElement(View, { style: styles.itemContainer },
          React.createElement(View, { style: styles.itemHeader },
            React.createElement(Text, { style: styles.itemTitle }, 'Full-Stack Developer'),
            React.createElement(Text, { style: styles.itemDate }, 'Dec 2022 – Feb 2025')
          ),
          React.createElement(Text, { style: styles.itemSub }, 'Sky Enterprise'),
          React.createElement(Bullet, null, 'Built and maintained MERN-stack applications that reduced manual business workload by 35%.'),
          React.createElement(Bullet, null, 'Implemented a hybrid SQL/NoSQL architecture, improving query performance by 40%.')
        ),

        React.createElement(View, { style: styles.itemContainer },
          React.createElement(View, { style: styles.itemHeader },
            React.createElement(Text, { style: styles.itemTitle }, 'Node.js Developer'),
            React.createElement(Text, { style: styles.itemDate }, 'Jan 2021 – Dec 2022')
          ),
          React.createElement(Text, { style: styles.itemSub }, 'Manaknight Inc.'),
          React.createElement(Bullet, null, 'Built backend systems in Node.js and PostgreSQL for mobile applications, scaling to 15,000+ active users.'),
          React.createElement(Bullet, null, 'Designed normalised database schemas that improved data retrieval speeds by 35%.')
        )
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Machine Learning & Applied Projects'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'CIFAR-10 Image Classifier: '), 'Built and trained a CNN from scratch in PyTorch.'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'ResumePro: '), 'Integrated Gemini API for AI-driven CV scoring within a job-tracking pipeline.'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'NovaPay: '), 'Designed a microservices wallet with saga orchestration over Kafka/RabbitMQ event streams.'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'LSTM Stock Price Prediction: '), 'Built an LSTM network for time-series stock price forecasting.')
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, 'Education & Certifications'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'MSc Computer Science'), ' - Gombe State University (2026 – Present)'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'BSc Computer Science'), ' - Gombe State University (Aug 2017 – Aug 2021)'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'Deep Learning Specialization'), ' - DeepLearning.AI (Coursera)'),
        React.createElement(Bullet, null, React.createElement(Text, { style: styles.bold }, 'Deep Learning Nanodegree'), ' - Udacity')
      )
    )
  )
);

renderToFile(React.createElement(Resume), 'public/resume.pdf')
  .then(() => console.log('PDF generated successfully!'))
  .catch(console.error);
