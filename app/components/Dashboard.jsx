'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Camera, 
  AlertTriangle, 
  Users, 
  Settings,
  Play,
  Clock,
  MapPin,
  User,
  Flame,
  UserX,
  Car,
  Eye
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">SecureSight</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-2 text-blue-400 font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
            <Camera className="h-4 w-4" />
            <span>Cameras</span>
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Scenes</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Incidents</a>
          <a href="#" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </a>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Settings className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
        <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-3 py-1">
          <User className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-300">Admin</span>
        </div>
      </div>
    </nav>
  );
};

const IncidentTypeIcon = ({ type }) => {
  switch (type) {
    case 'motion':
      return <Camera className="h-4 w-4 text-blue-500" />;
    case 'intrusion':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'suspicious_activity':
      return <Eye className="h-4 w-4 text-yellow-500" />;
    case 'fire':
      return <Flame className="h-4 w-4 text-orange-500" />;
    case 'vandalism':
      return <UserX className="h-4 w-4 text-purple-500" />;
    case 'unauthorized_access':
      return <User className="h-4 w-4 text-red-600" />;
    case 'loitering':
      return <User className="h-4 w-4 text-amber-500" />;
    case 'vehicle_incident':
      return <Car className="h-4 w-4 text-indigo-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-500" />;
  }
};

const IncidentPlayer = ({ selectedIncident }) => {
  const [thumbnails] = useState([
    'https://picsum.photos/100/75?random=thumb1',
    'https://picsum.photos/100/75?random=thumb2'
  ]);

  if (!selectedIncident) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 h-full flex items-center justify-center">
        <div className="text-center text-slate-400">
          <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select an incident to view details</p>
          <p className="text-sm mt-2">Choose from the incident list on the right</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-xl font-semibold">
            {selectedIncident.camera.name}
          </h3>
          {selectedIncident.resolved && (
            <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              Resolved
            </span>
          )}
        </div>
        <div className="flex items-center space-x-6 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <IncidentTypeIcon type={selectedIncident.type} />
            <span className="capitalize font-medium">
              {selectedIncident.type.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedIncident.camera.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              {new Date(selectedIncident.tsStart).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main video/image player */}
      <div className="relative bg-slate-700 rounded-lg mb-4 aspect-video flex-1">
        <img 
          src={selectedIncident.thumbnailUrl} 
          alt="Incident footage"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
          <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-colors shadow-lg">
            <Play className="h-8 w-8 text-white fill-current" />
          </button>
        </div>
        {/* Timestamp overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded">
          {new Date(selectedIncident.tsStart).toLocaleTimeString('en-US', {
            hour12: false
          })}
        </div>
      </div>
      
      {/* Thumbnail strip */}
      <div className="flex space-x-3">
        <div className="text-slate-400 text-sm font-medium py-2">
          Related:
        </div>
        {thumbnails.map((thumb, index) => (
          <div key={index} className="bg-slate-700 rounded border-2 border-transparent hover:border-blue-500 cursor-pointer transition-colors">
            <img 
              src={thumb} 
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-18 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const IncidentList = ({ incidents, selectedIncident, onSelectIncident, onResolveIncident, loading }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDuration = (start, end) => {
    const duration = Math.floor((new Date(end) - new Date(start)) / 1000 / 60);
    return duration > 0 ? `${duration}m` : '< 1m';
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const incident = new Date(date);
    const diffInHours = Math.floor((now - incident) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return incident.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 h-full">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Incidents</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-700 rounded-lg p-4 animate-pulse">
              <div className="flex space-x-3">
                <div className="w-16 h-12 bg-slate-600 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-600 rounded w-1/2"></div>
                  <div className="h-6 bg-slate-600 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Recent Incidents</h3>
        <span className="text-slate-400 text-sm">
          {incidents.filter(i => !i.resolved).length} unresolved
        </span>
      </div>
      
      <div className="space-y-3 overflow-y-auto flex-1">
        {incidents.length === 0 ? (
          <div className="text-center text-slate-400 mt-8">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No incidents found</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                selectedIncident?.id === incident.id
                  ? 'bg-slate-700 border-blue-500 shadow-blue-500/20'
                  : 'bg-slate-900 border-slate-600 hover:border-slate-500 hover:bg-slate-800'
              }`}
              onClick={() => onSelectIncident(incident)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img 
                    src={incident.thumbnailUrl} 
                    alt="Incident thumbnail"
                    className="w-16 h-12 object-cover rounded"
                  />
                  {!incident.resolved && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <IncidentTypeIcon type={incident.type} />
                    <span className="text-white text-sm font-medium capitalize">
                      {incident.type.replace('_', ' ')}
                    </span>
                    {incident.resolved && (
                      <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                        Resolved
                      </span>
                    )}
                  </div>
                  
                  <div className="text-slate-400 text-sm mb-2 space-y-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{incident.camera.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatTime(incident.tsStart)} - {formatTime(incident.tsEnd)} 
                          ({formatDuration(incident.tsStart, incident.tsEnd)})
                        </span>
                      </div>
                      <span className="text-xs">
                        {formatRelativeTime(incident.tsStart)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onResolveIncident(incident.id);
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      incident.resolved
                        ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {incident.resolved ? 'Reopen' : 'Resolve'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch incidents from API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all incidents (both resolved and unresolved)
        const response = await fetch('/api/incidents');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setIncidents(result.data);
          // Auto-select the first unresolved incident, or first incident if none unresolved
          const unresolved = result.data.find(incident => !incident.resolved);
          setSelectedIncident(unresolved || result.data[0] || null);
        } else {
          throw new Error(result.error || 'Failed to fetch incidents');
        }
      } catch (error) {
        console.error('Failed to fetch incidents:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleResolveIncident = async (incidentId) => {
    // Optimistic UI update
    const originalIncidents = [...incidents];
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, resolved: !incident.resolved }
          : incident
      )
    );

    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Update with server response
        setIncidents(prev => 
          prev.map(incident => 
            incident.id === incidentId 
              ? result.data
              : incident
          )
        );
        
        // Update selected incident if it's the one that was modified
        if (selectedIncident?.id === incidentId) {
          setSelectedIncident(result.data);
        }
      } else {
        throw new Error(result.error || 'Failed to update incident');
      }
    } catch (error) {
      console.error('Failed to update incident:', error);
      // Revert optimistic update on error
      setIncidents(originalIncidents);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="p-6 flex items-center justify-center h-[calc(100vh-120px)]">
          <div className="text-center text-red-400">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Left side - Incident Player */}
          <div className="lg:col-span-2">
            <IncidentPlayer selectedIncident={selectedIncident} />
          </div>
          
          {/* Right side - Incident List */}
          <div className="lg:col-span-1">
            <IncidentList
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={setSelectedIncident}
              onResolveIncident={handleResolveIncident}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;