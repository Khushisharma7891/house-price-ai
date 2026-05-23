import { Link } from 'react-router-dom'

const stats = [
  { value: '78.5%', label: 'Prediction Accuracy', desc: 'Based on test data evaluation' },
  { value: '19,440', label: 'Houses in Dataset', desc: 'Real California housing records' },
  { value: '4', label: 'ML Models Compared', desc: 'Best model selected automatically' },
  { value: '$30,802', label: 'Mean Absolute Error', desc: 'Average prediction deviation' }
]

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/>
      </svg>
    ),
    title: 'Real Dataset',
    desc: 'Built on the California Housing Dataset — a standard benchmark used by data scientists and ML researchers worldwide.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'Random Forest Model',
    desc: 'Trained using Random Forest Regressor — an ensemble ML algorithm that combines 100 decision trees for accurate predictions.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Instant Results',
    desc: 'Enter house details and get a predicted market value instantly — along with a confidence score and explanation.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Enter House Details',
    desc: 'Fill in location coordinates, house age, number of rooms, population density and median income of the area.'
  },
  {
    number: '02',
    title: 'AI Processes Input',
    desc: 'Our Random Forest model applies the same preprocessing pipeline used during training to ensure accurate predictions.'
  },
  {
    number: '03',
    title: 'Get Price Estimate',
    desc: 'Receive an estimated house value in USD along with a confidence score and a plain English explanation of the result.'
  }
]

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-slate-900 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)', backgroundSize: '200% 200%' }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label mb-6 animate-fadeIn">
              California Housing Dataset — ML Project
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight animate-fadeIn delay-100"
              style={{ letterSpacing: '-0.02em' }}>
              Predict California
              <span className="text-amber-400"> House Prices</span>
              <br />with Machine Learning
            </h1>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed animate-fadeIn delay-200">
              A full stack ML web application built as a Project.
              Enter house details from the California housing market and get
              an instant price prediction powered by Random Forest algorithm.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-fadeIn delay-300">
              <Link to="/predict"
                className="btn-amber px-8 py-4 rounded-xl text-base">
                Try Price Prediction
              </Link>
              <Link to="/signup"
                className="btn-outline px-8 py-4 rounded-xl text-base"
                style={{ borderColor: '#475569', color: '#94a3b8' }}
                onMouseEnter={e => { e.target.style.background = '#1e293b'; e.target.style.color = 'white' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#94a3b8' }}>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i}
                className={`stat-card card-hover animate-fadeIn delay-${(i+1)*100}`}>
                <div className="text-3xl font-black text-slate-900 mb-1"
                  style={{ letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About the Project */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInLeft">
            <div className="section-label mb-4">About This Project</div>
            <h2 className="text-4xl font-black text-slate-900 mb-6"
              style={{ letterSpacing: '-0.02em' }}>
              A Real World ML
              <span className="text-amber-500"> Application</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              This project demonstrates a complete end to end machine learning
              pipeline — from raw data to a deployed web application. It was
              built as a BCA 6th semester final year project.
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              The California Housing Dataset contains data from the 1990 US
              Census. Each record represents one block group in California —
              including location, age, rooms, population and median income.
              The goal is to predict the median house value for each block.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Data preprocessing and feature engineering',
                'EDA with correlation analysis and visualizations',
                'Comparison of 4 ML models — Linear Regression, Decision Tree, Random Forest, Gradient Boosting',
                'Random Forest selected with 78.5% R2 Score',
                'Full stack deployment with React and Flask'
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-slate-600 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fadeInRight">
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-500 text-xs ml-2">model_results.py</span>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500"># Model Comparison Results</p>
                <p className="text-slate-300">models = {'{'}</p>
                <p className="text-slate-300 pl-4"><span className="text-amber-400">'Linear Regression'</span>: {'{'}</p>
                <p className="text-slate-400 pl-8">'R2': <span className="text-green-400">0.6119</span>,</p>
                <p className="text-slate-400 pl-8">'MAE': <span className="text-green-400">45480</span></p>
                <p className="text-slate-300 pl-4">{'}'}</p>
                <p className="text-slate-300 pl-4"><span className="text-amber-400">'Decision Tree'</span>: {'{'}</p>
                <p className="text-slate-400 pl-8">'R2': <span className="text-green-400">0.5910</span>,</p>
                <p className="text-slate-400 pl-8">'MAE': <span className="text-green-400">42108</span></p>
                <p className="text-slate-300 pl-4">{'}'}</p>
                <p className="text-slate-300 pl-4"><span className="text-amber-400">'Random Forest'</span>: {'{'}</p>
                <p className="text-slate-400 pl-8">'R2': <span className="text-emerald-400 font-bold">0.7850</span>, <span className="text-slate-500"># Best</span></p>
                <p className="text-slate-400 pl-8">'MAE': <span className="text-emerald-400 font-bold">30802</span></p>
                <p className="text-slate-300 pl-4">{'}'}</p>
                <p className="text-slate-300 pl-4"><span className="text-amber-400">'Gradient Boosting'</span>: {'{'}</p>
                <p className="text-slate-400 pl-8">'R2': <span className="text-green-400">0.7495</span>,</p>
                <p className="text-slate-400 pl-8">'MAE': <span className="text-green-400">35323</span></p>
                <p className="text-slate-300 pl-4">{'}'}</p>
                <p className="text-slate-300">{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label mb-4">What's Inside</div>
            <h2 className="text-4xl font-black text-slate-900"
              style={{ letterSpacing: '-0.02em' }}>
              Built with Real
              <span className="text-amber-500"> ML Concepts</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className={`bg-white rounded-2xl p-8 card-hover border border-slate-100 animate-fadeIn delay-${(i+1)*100}`}>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="section-label mb-4">How it Works</div>
          <h2 className="text-4xl font-black text-slate-900"
            style={{ letterSpacing: '-0.02em' }}>
            Three Steps to
            <span className="text-amber-500"> Your Prediction</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i}
              className={`relative animate-fadeIn delay-${(i+1)*100}`}>
              <div className="text-8xl font-black text-slate-100 absolute -top-4 -left-2"
                style={{ letterSpacing: '-0.04em' }}>
                {step.number}
              </div>
              <div className="relative pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="section-label mb-4">Technology Stack</div>
            <h2 className="text-3xl font-black text-slate-900"
              style={{ letterSpacing: '-0.02em' }}>
              Built With Industry
              <span className="text-amber-500"> Standard Tools</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Python', role: 'ML & Backend', color: 'bg-blue-50 text-blue-700' },
              { name: 'React.js', role: 'Frontend', color: 'bg-cyan-50 text-cyan-700' },
              { name: 'Flask', role: 'API Server', color: 'bg-green-50 text-green-700' },
              { name: 'MongoDB', role: 'Database', color: 'bg-emerald-50 text-emerald-700' },
              { name: 'Scikit-learn', role: 'ML Library', color: 'bg-orange-50 text-orange-700' },
              { name: 'Pandas', role: 'Data Processing', color: 'bg-purple-50 text-purple-700' },
              { name: 'Tailwind CSS', role: 'Styling', color: 'bg-sky-50 text-sky-700' },
              { name: 'Random Forest', role: 'ML Algorithm', color: 'bg-amber-50 text-amber-700' }
            ].map((tech, i) => (
              <div key={i}
                className="bg-white rounded-xl p-4 border border-slate-100 card-hover text-center">
                <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-2 ${tech.color}`}>
                  {tech.name}
                </div>
                <div className="text-slate-400 text-xs">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}>
            Try the Prediction
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Enter California house details and see how our
            Random Forest model predicts the market value
            instantly based on real 1990 census data.
          </p>
          <Link to="/predict"
            className="btn-amber px-10 py-4 rounded-xl text-base inline-block">
            Open Prediction Tool
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                  fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-slate-900">HousePriceAI</span>
          </div>
          <p className="text-slate-400 text-sm">
            House Prediction — Built by Khushi Sharma | Web Developer
          </p>
          <p className="text-slate-400 text-sm">
            Dataset: California Housing — 1990 US Census
          </p>
        </div>
      </div>

    </div>
  )
}

export default Home