"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

export default function DailyTraining() {
  const [quests, setQuests] = useState([
    { id: '1', name: 'Push-ups', progress: 0, target: 28, completed: false },
    { id: '2', name: 'Squats', progress: 0, target: 28, completed: false },
    { id: '3', name: 'Sit-ups', progress: 0, target: 28, completed: false },
    { id: '4', name: 'Running', progress: 0.88, target: 1.6, unit: 'km', completed: false }
  ]);
  const [timeRemaining, setTimeRemaining] = useState('11:10:13');

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateTimer = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    
    if (diff <= 0) {
      setTimeRemaining('00:00:00');
      return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const handleQuestComplete = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: !quest.completed } : quest
    ));
  };

  const getProgressDisplay = (quest: any) => {
    if (quest.unit) {
      return `${quest.progress.toFixed(2)}/${quest.target}${quest.unit}`;
    }
    return `${quest.progress}/${quest.target}`;
  };

  const completionPercentage = Math.round((quests.filter(q => q.completed).length / quests.length) * 100);

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-blue-300">12:18</div>
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xs">🔔</span>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </div>
        </div>
      </div>

      {/* Daily Training Card */}
      <Card className="bg-blue-800/50 border-blue-600 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Daily Training</h1>
            <p className="text-blue-300">{quests.filter(q => !q.completed).length} exercises remaining</p>
          </div>
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-full border-4 border-blue-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Daily Quest Card */}
      <Card className="bg-slate-800/80 border-blue-600 p-6 mb-6">
        <div className="border border-blue-500 rounded p-4 mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">i</span>
            </div>
            <h2 className="text-xl font-bold text-white">DAILY QUEST</h2>
          </div>
          
          <p className="text-center text-blue-300 mb-6">[Training to become a great warrior.]</p>
          
          <h3 className="text-center text-2xl font-bold text-white mb-6">GOALS</h3>
          
          {/* Quest List */}
          <div className="space-y-4 mb-6">
            {quests.map((quest) => (
              <div key={quest.id} className="flex items-center justify-between">
                <span className="text-white">{quest.name}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">
                    [{getProgressDisplay(quest)}]
                  </span>
                  <Checkbox
                    checked={quest.completed}
                    onCheckedChange={() => handleQuestComplete(quest.id)}
                    className="w-6 h-6 border-2 border-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Warning */}
          <div className="text-center mb-4">
            <p className="text-red-400 font-bold">WARNING!</p>
            <p className="text-white text-sm">
              Failure to complete the quest within the allotted time will incur an appropriate penalty.
            </p>
          </div>
          
          {/* Timer */}
          <div className="text-center">
            <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-black text-xs">⏰</span>
            </div>
            <div className="text-3xl font-bold text-white">{timeRemaining}</div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
        >
          Daily Quest
        </Button>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 p-4">
        <div className="flex justify-center space-x-8 max-w-md mx-auto">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white">🏠</span>
          </div>
          <Link href="/status">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-white">📊</span>
            </div>
          </Link>
          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
