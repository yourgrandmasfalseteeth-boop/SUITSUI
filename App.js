const { useState } = React;
const { Map, Compass, Radio, Wrench, Activity, MessageSquare, Info, ChevronRight, Bot } = lucide;
const SIRIUSSystem = () => {
  const [currentPage, setCurrentPage] = useState('navigation');

  const aiMessages = [
    { id: 1, sender: 'User', content: 'What is the distance to Rock Sample Site A?', time: '14:15' },
    { id: 2, sender: 'AI', content: 'Distance to Rock Sample Site A is 487 meters. Estimated travel time: 12 minutes at current pace.', time: '14:15' }
  ];

  const waypoints = [
    { id: 1, name: 'Base Station', type: 'destination', lat: '0.6734°N', long: '23.4731°E', status: 'active' },
    { id: 2, name: 'EVA Crewmember', type: 'eva', lat: '0.6821°N', long: '23.4892°E', status: 'active' },
    { id: 3, name: 'PR Location', type: 'rover', lat: '0.6798°N', long: '23.4856°E', status: 'active' },
    { id: 4, name: 'Rock Sample Site A', type: 'poi', lat: '0.6845°N', long: '23.4923°E', status: 'pending' },
    { id: 5, name: 'Crater Hazard', type: 'hazard', lat: '0.6812°N', long: '23.4901°E', status: 'warning' },
    { id: 6, name: 'LTV Vehicle', type: 'poi', lat: '0.6867°N', long: '23.4945°E', status: 'pending' }
  ];

  const missionTasks = [
    { id: 1, task: 'Egress from PR to surface', completed: true },
    { id: 2, task: 'Navigate to Rock Sample Site A', completed: true },
    { id: 3, task: 'Collect geological samples (0/3)', completed: false },
    { id: 4, task: 'Locate and scan LTV vehicle', completed: false },
    { id: 5, task: 'Perform LTV diagnostics', completed: false },
    { id: 6, task: 'Return to PR for ingress', completed: false }
  ];

  const messages = [
    { id: 1, sender: 'EVA', content: 'Approaching sample site now', time: '14:23' },
    { id: 2, sender: 'PR', content: 'Copy that. Vitals looking good', time: '14:24' },
    { id: 3, sender: 'EVA', content: 'Sample collection in progress', time: '14:31' },
    { id: 4, sender: 'PR', content: 'Roger. Monitor O2 levels', time: '14:32' }
  ];

  const Navigation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Map */}
        <div className="lg:col-span-2 bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <Map size={24} />
            Terrain Map
          </h3>
          <div className="relative bg-gray-950 rounded h-96 border border-gray-700 overflow-hidden">
            {/* Simulated map with grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
            
            {/* Waypoint markers */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Base Station"></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-blue-500 rounded-full" title="EVA"></div>
            <div className="absolute top-2/5 left-3/5 w-3 h-3 bg-yellow-500 rounded-full" title="PR"></div>
            <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-purple-500 rounded-full" title="POI"></div>
            <div className="absolute top-1/3 left-5/12 w-3 h-3 bg-red-500 rounded-full" title="Hazard"></div>
            
            {/* Distance rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-500/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-500/10 rounded-full"></div>
          </div>
        </div>

        {/* Compass */}
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <Compass size={24} />
            Direction
          </h3>
          <div className="flex justify-center items-center h-96">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 bg-gray-950"></div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-purple-400 font-bold">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-600 font-bold">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 font-bold">W</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 font-bold">E</div>
              {/* Compass needle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-red-500 to-gray-500 origin-bottom" style={{transform: 'translate(-50%, -50%) rotate(42deg)'}}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl font-bold text-purple-400">042°</div>
            </div>
          </div>
        </div>
      </div>

      {/* Waypoints List */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Waypoints</h3>
        <div className="space-y-2">
          {waypoints.map(wp => (
            <div key={wp.id} className="bg-gray-950 rounded p-4 border border-gray-700 flex items-center justify-between hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  wp.type === 'eva' ? 'bg-blue-500' :
                  wp.type === 'rover' ? 'bg-yellow-500' :
                  wp.type === 'hazard' ? 'bg-red-500' :
                  wp.type === 'destination' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
                <div>
                  <div className="font-semibold text-white">{wp.name}</div>
                  <div className="text-sm text-gray-400">{wp.type.toUpperCase()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-mono text-sm">{wp.lat}</div>
                <div className="text-purple-400 font-mono text-sm">{wp.long}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Mission = () => (
    <div className="space-y-6">
      {/* Task Checklist */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Mission Tasks</h3>
        <div className="space-y-3">
          {missionTasks.map(task => (
            <div key={task.id} className="bg-gray-950 rounded p-4 border border-gray-700 flex items-center gap-4 hover:border-purple-500/50 transition-colors">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-gray-600'
              }`}>
                {task.completed && <span className="text-white text-sm">✓</span>}
              </div>
              <div className={`flex-1 ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                {task.task}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-400">LTV Repair Analysis</h3>
            <button className="px-4 py-2 bg-purple-500/20 border border-purple-500 text-purple-400 rounded hover:bg-purple-500/30 transition-colors text-sm">
              Toggle AI
            </button>
          </div>
          <div className="bg-gray-950 rounded p-4 border border-gray-700 space-y-3">
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Status:</span> LTV vehicle located at waypoint coordinates
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Issue Detected:</span> Power system anomaly in left solar panel array
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Recommended Action:</span> Inspect connection terminals and dust accumulation
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Tools Required:</span> Cleaning kit, multimeter, spare connectors
            </div>
          </div>
        </div>

        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-400">Geological Sample Summary</h3>
            <button className="px-4 py-2 bg-purple-500/20 border border-purple-500 text-purple-400 rounded hover:bg-purple-500/30 transition-colors text-sm">
              Toggle AI
            </button>
          </div>
          <div className="bg-gray-950 rounded p-4 border border-gray-700 space-y-3">
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Samples Collected:</span> 0 of 3
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Target Location:</span> Mare Imbrium highland boundary
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Expected Composition:</span> Anorthosite, impact breccia
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400 font-semibold">Scientific Value:</span> High priority for crustal formation analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Vitals = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EVA Suit Vitals */}
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <Activity size={24} />
            EVA Suit Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Oxygen Level</span>
                <span className="text-white font-semibold">78%</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-4 border border-gray-700">
                <div className="bg-green-500 h-full rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Battery Level</span>
                <span className="text-white font-semibold">85%</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-4 border border-gray-700">
                <div className="bg-purple-500 h-full rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">System Status</span>
                <span className="text-green-400 font-semibold">NOMINAL</span>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500 rounded p-4 mt-4">
              <div className="text-yellow-400 font-semibold mb-1">Point of No Return</div>
              <div className="text-3xl font-bold text-yellow-400 font-mono">02:34:18</div>
              <div className="text-yellow-400/80 text-sm mt-1">Time remaining to return to base</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-950 rounded p-3 border border-gray-700">
                <div className="text-gray-400 text-sm">Heart Rate</div>
                <div className="text-white text-xl font-bold">72 BPM</div>
              </div>
              <div className="bg-gray-950 rounded p-3 border border-gray-700">
                <div className="text-gray-400 text-sm">Suit Pressure</div>
                <div className="text-white text-xl font-bold">4.3 PSI</div>
              </div>
            </div>
          </div>
        </div>

        {/* PR Vitals */}
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Pressurized Rover Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Oxygen Reserve</span>
                <span className="text-white font-semibold">92%</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-4 border border-gray-700">
                <div className="bg-green-500 h-full rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Power Level</span>
                <span className="text-white font-semibold">67%</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-4 border border-gray-700">
                <div className="bg-purple-500 h-full rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">System Status</span>
                <span className="text-green-400 font-semibold">NOMINAL</span>
              </div>
            </div>

            <div className="bg-purple-500/20 border border-purple-500 rounded p-4 mt-4">
              <div className="text-purple-400 font-semibold mb-1">Return Window</div>
              <div className="text-3xl font-bold text-purple-400 font-mono">04:12:45</div>
              <div className="text-purple-400/80 text-sm mt-1">Operating time remaining</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-950 rounded p-3 border border-gray-700">
                <div className="text-gray-400 text-sm">Interior Temp</div>
                <div className="text-white text-xl font-bold">21°C</div>
              </div>
              <div className="bg-gray-950 rounded p-3 border border-gray-700">
                <div className="text-gray-400 text-sm">Cabin Pressure</div>
                <div className="text-white text-xl font-bold">14.7 PSI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoverControls = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driving Controls */}
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Driving Mode</h3>
          <div className="space-y-3">
            <button className="w-full bg-gray-950 border-2 border-gray-700 text-white p-4 rounded hover:border-purple-500 transition-colors text-left">
              <div className="font-semibold">Manual Driving</div>
              <div className="text-sm text-gray-400">Full operator control</div>
            </button>
            <button className="w-full bg-purple-500/20 border-2 border-purple-500 text-white p-4 rounded text-left">
              <div className="font-semibold">Assisted Driving</div>
              <div className="text-sm text-purple-400">AI hazard avoidance active</div>
            </button>
            <button className="w-full bg-gray-950 border-2 border-gray-700 text-white p-4 rounded hover:border-purple-500 transition-colors text-left">
              <div className="font-semibold">Autonomous</div>
              <div className="text-sm text-gray-400">Navigate to waypoint</div>
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-yellow-500 border-2 border-yellow-600 text-gray-900 font-semibold p-3 rounded hover:bg-yellow-400 transition-colors">
              ENGAGE BRAKES
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gray-950 border-2 border-gray-700 text-white p-3 rounded hover:border-purple-500 transition-colors">
                Headlights OFF
              </button>
              <button className="bg-gray-950 border-2 border-gray-700 text-white p-3 rounded hover:border-purple-500 transition-colors">
                Scan for LTV
              </button>
            </div>
          </div>
        </div>

        {/* Destination Input */}
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Destination Coordinates</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Latitude</label>
              <input 
                type="text" 
                placeholder="0.0000°N"
                className="w-full bg-gray-950 border border-gray-700 rounded p-3 text-white font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Longitude</label>
              <input 
                type="text" 
                placeholder="0.0000°E"
                className="w-full bg-gray-950 border border-gray-700 rounded p-3 text-white font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button className="w-full bg-purple-500 border-2 border-purple-600 text-white font-semibold p-3 rounded hover:bg-purple-400 transition-colors">
              Set Destination
            </button>
          </div>

          <div className="mt-6 bg-gray-950 rounded p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Current Destination</div>
            <div className="text-white font-mono">0.6845°N, 23.4923°E</div>
            <div className="text-purple-400 text-sm mt-1">Rock Sample Site A</div>
          </div>
        </div>
      </div>

      {/* Ingress/Egress Controls */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Ingress/Egress Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-gray-950 border-2 border-gray-700 text-white p-4 rounded hover:border-purple-500 transition-colors">
            <div className="font-semibold">Open Airlock</div>
            <div className="text-sm text-gray-400 mt-1">Step 1</div>
          </button>
          <button className="bg-gray-950 border-2 border-gray-700 text-white p-4 rounded hover:border-purple-500 transition-colors">
            <div className="font-semibold">Depressurize</div>
            <div className="text-sm text-gray-400 mt-1">Step 2</div>
          </button>
          <button className="bg-gray-950 border-2 border-gray-700 text-white p-4 rounded hover:border-purple-500 transition-colors">
            <div className="font-semibold">Open Hatch</div>
            <div className="text-sm text-gray-400 mt-1">Step 3</div>
          </button>
          <button className="bg-green-500/20 border-2 border-green-500 text-green-400 p-4 rounded hover:bg-green-500/30 transition-colors">
            <div className="font-semibold">Confirm Egress</div>
            <div className="text-sm mt-1">Step 4</div>
          </button>
        </div>
      </div>
    </div>
  );

  const Networking = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">EVA ↔ PR Connection</h3>
          <div className="flex items-center justify-center py-8">
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-semibold text-xl">CONNECTED</div>
            <div className="text-gray-400 text-sm mt-1">Signal Strength: 94%</div>
            <div className="text-gray-400 text-sm">Latency: 12ms</div>
          </div>
          <button className="w-full mt-4 bg-gray-950 border border-gray-700 text-white p-2 rounded hover:border-purple-500 transition-colors text-sm">
            Test Connection
          </button>
        </div>

        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">NASA TTS Link</h3>
          <div className="flex items-center justify-center py-8">
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-semibold text-xl">CONNECTED</div>
            <div className="text-gray-400 text-sm mt-1">Signal Strength: 87%</div>
            <div className="text-gray-400 text-sm">Latency: 340ms</div>
          </div>
          <button className="w-full mt-4 bg-gray-950 border border-gray-700 text-white p-2 rounded hover:border-purple-500 transition-colors text-sm">
            Test Connection
          </button>
        </div>

        <div className="bg-black rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">System Status</h3>
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between bg-gray-950 rounded p-3 border border-gray-700">
              <span className="text-gray-400">Primary Antenna</span>
              <span className="text-green-400 font-semibold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between bg-gray-950 rounded p-3 border border-gray-700">
              <span className="text-gray-400">Backup Antenna</span>
              <span className="text-gray-400 font-semibold">STANDBY</span>
            </div>
            <div className="flex items-center justify-between bg-gray-950 rounded p-3 border border-gray-700">
              <span className="text-gray-400">Network Mode</span>
              <span className="text-purple-400 font-semibold">MESH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Devices */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Connected Devices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'EVA Helmet Display', ip: '192.168.1.101', status: 'connected' },
            { name: 'EVA Wrist Terminal', ip: '192.168.1.102', status: 'connected' },
            { name: 'PR Central Computer', ip: '192.168.1.110', status: 'connected' },
            { name: 'PR Tablet Interface', ip: '192.168.1.111', status: 'connected' },
            { name: 'Base Station Relay', ip: '192.168.1.200', status: 'connected' },
            { name: 'LTV Scanner', ip: '192.168.1.150', status: 'disconnected' }
          ].map((device, i) => (
            <div key={i} className="bg-gray-950 rounded p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{device.name}</span>
                <div className={`w-3 h-3 rounded-full ${device.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              <div className="text-gray-400 text-sm font-mono">{device.ip}</div>
              <div className={`text-sm mt-1 ${device.status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
                {device.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IP Configuration */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Add New Device</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Device Name"
            className="bg-gray-950 border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
          />
          <input 
            type="text" 
            placeholder="IP Address"
            className="bg-gray-950 border border-gray-700 rounded p-3 text-white font-mono focus:border-purple-500 focus:outline-none"
          />
          <button className="bg-purple-500 border-2 border-purple-600 text-white font-semibold rounded hover:bg-purple-400 transition-colors">
            Connect Device
          </button>
        </div>
      </div>
    </div>
  );

  const MissionAssistant = () => (
    <div className="space-y-6">
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Bot size={24} />
          AI Mission Assistant
        </h3>
        
        <div className="bg-gray-950 rounded p-4 border border-gray-700 mb-4">
          <div className="text-sm text-gray-400 mb-2">Powered by Llama 3.1 8B + Whisper Voice-to-Text</div>
          <div className="text-sm text-gray-300">
            Ask questions about mission procedures, equipment diagnostics, geological analysis, or navigation assistance.
          </div>
        </div>

        {/* AI Chat Display */}
        <div className="bg-gray-950 rounded border border-gray-700 h-[350px] overflow-y-auto p-4 space-y-4 mb-4">
          {aiMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl rounded-lg p-4 ${
                msg.sender === 'User' 
                  ? 'bg-purple-500/20 border border-purple-500' 
                  : 'bg-gray-800 border border-purple-400/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-semibold text-sm ${
                    msg.sender === 'User' ? 'text-purple-400' : 'text-purple-300'
                  }`}>
                    {msg.sender === 'User' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-gray-500 text-xs">{msg.time}</span>
                </div>
                <div className="text-white leading-relaxed">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Ask the AI assistant..."
              className="flex-1 bg-gray-950 border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
            />
            <button className="bg-purple-500 border-2 border-purple-600 text-white font-semibold px-6 rounded hover:bg-purple-400 transition-colors">
              Send
            </button>
          </div>

          {/* Voice Input Button */}
          <button className="w-full bg-gray-950 border-2 border-purple-500 text-purple-400 p-3 rounded hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2">
            <Radio size={20} />
            <span className="font-semibold">Push to Talk (Voice Input)</span>
          </button>
        </div>

        {/* Quick Questions */}
        <div className="mt-6">
          <div className="text-gray-400 text-sm mb-3">Suggested Questions:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'What are the procedures for sample collection?',
              'How do I diagnose LTV power issues?',
              'What is the composition of this terrain?',
              'Calculate optimal return path to PR',
              'Explain ingress/egress safety protocols',
              'What are signs of suit system failure?'
            ].map((question, i) => (
              <button key={i} className="bg-gray-950 border border-gray-700 text-gray-300 px-3 py-2 rounded text-sm text-left hover:border-purple-500 hover:text-purple-400 transition-colors">
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Capabilities Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-2 text-sm">Technical Support</h4>
          <p className="text-gray-400 text-sm">Equipment diagnostics, repair procedures, and system troubleshooting</p>
        </div>
        <div className="bg-black rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-2 text-sm">Mission Guidance</h4>
          <p className="text-gray-400 text-sm">Navigation planning, task prioritization, and safety protocols</p>
        </div>
        <div className="bg-black rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-2 text-sm">Scientific Analysis</h4>
          <p className="text-gray-400 text-sm">Geological identification, sample assessment, and terrain analysis</p>
        </div>
      </div>
    </div>
  );

  const Messaging = () => (
    <div className="space-y-6">
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <MessageSquare size={24} />
          EVA ↔ PR Communication
        </h3>
        
        {/* Messages Display */}
        <div className="bg-gray-950 rounded border border-gray-700 h-96 overflow-y-auto p-4 space-y-3 mb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'EVA' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-lg p-3 ${
                msg.sender === 'EVA' 
                  ? 'bg-purple-500/20 border border-purple-500' 
                  : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold text-sm ${
                    msg.sender === 'EVA' ? 'text-purple-400' : 'text-yellow-400'
                  }`}>
                    {msg.sender}
                  </span>
                  <span className="text-gray-500 text-xs">{msg.time}</span>
                </div>
                <div className="text-white">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Type message..."
            className="flex-1 bg-gray-950 border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
          />
          <button className="bg-purple-500 border-2 border-purple-600 text-white font-semibold px-6 rounded hover:bg-purple-400 transition-colors">
            Send
          </button>
        </div>

        {/* Quick Messages */}
        <div className="mt-4">
          <div className="text-gray-400 text-sm mb-2">Quick Messages:</div>
          <div className="flex flex-wrap gap-2">
            {['Status check', 'Return to PR', 'Assistance needed', 'Task complete', 'Hazard detected'].map((quick, i) => (
              <button key={i} className="bg-gray-950 border border-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:border-purple-500 hover:text-purple-400 transition-colors">
                {quick}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Log */}
      <div className="bg-black rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Communication Log</h3>
        <div className="bg-gray-950 rounded border border-gray-700 max-h-48 overflow-y-auto">
          {[...messages].reverse().map(msg => (
            <div key={msg.id} className="p-3 border-b border-gray-800 last:border-b-0 hover:bg-gray-900 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${msg.sender === 'EVA' ? 'text-purple-400' : 'text-yellow-400'}`}>
                    {msg.sender}
                  </span>
                  <span className="text-gray-400">{msg.content}</span>
                </div>
                <span className="text-gray-500 text-sm">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const pages = {
    navigation: { component: Navigation, icon: Map, label: 'Navigation' },
    mission: { component: Mission, icon: Info, label: 'Mission' },
    vitals: { component: Vitals, icon: Activity, label: 'Vitals' },
    rover: { component: RoverControls, icon: Wrench, label: 'Rover Controls' },
    assistant: { component: MissionAssistant, icon: Bot, label: 'Mission Assistant' },
    networking: { component: Networking, icon: Radio, label: 'Networking' },
    messaging: { component: Messaging, icon: MessageSquare, label: 'Messaging' }
  };

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white">
      {/* Header */}
      <div className="bg-black/50 border-b border-purple-500/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-400">SIRIUS</h1>
              <p className="text-gray-400 text-sm">NASA SUITS Competition Interface System</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-gray-400 text-sm">Mission Time</div>
                <div className="text-purple-400 font-mono text-xl">02:47:33</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-black rounded-lg border border-purple-500/30 p-4 sticky top-8">
            <h2 className="text-purple-400 font-semibold mb-4">System Pages</h2>
            <div className="space-y-2">
              {Object.entries(pages).map(([key, page]) => {
                const Icon = page.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                      currentPage === key
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500'
                        : 'text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="flex-1 text-left">{page.label}</span>
                    {currentPage === key && <ChevronRight size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <CurrentPageComponent />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  React.createElement(SIRIUSSystem),
  document.getElementById('root')
);
