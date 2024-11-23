import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { avatars } from '../../assets/avatars';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
  onSave: (data: { username: string; email: string; password?: string; avatar: string }) => void;
  onLogout: () => void;
}

const avatarOptions = [
  { id: 'owl', src: avatars.owl, label: 'Owl' },
  { id: 'lion', src: avatars.lion, label: 'Lion' },
  { id: 'fox', src: avatars.fox, label: 'Fox' },
  { id: 'dog', src: avatars.dog, label: 'Dog' },
  { id: 'bear', src: avatars.bear, label: 'Bear' },
  { id: 'coala', src: avatars.coala, label: 'Koala' }
];

export const SettingsModal = ({
  isOpen,
  onClose,
  user,
  onSave,
  onLogout
}: SettingsModalProps) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || avatarOptions[0].src);

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      return;
    }

    onSave({
      username,
      email,
      avatar: selectedAvatar,
      ...(password ? { password } : {})
    });
    onClose();
  };

  const actions = (
    <div className="space-y-3">
      <button
        onClick={handleSave}
        disabled={!username.trim() || !email.trim() || (password && password !== confirmPassword)}
        className="w-full bg-[#FF8812] text-white font-medium py-3 px-6 rounded-full hover:bg-[#FF8812]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Changes
      </button>

      <button
        onClick={onLogout}
        className="w-full bg-[#362007]/10 text-[#362007] font-medium py-3 px-6 rounded-full hover:bg-[#362007]/20 transition-colors"
      >
        Log Out
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      actions={actions}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            Choose Avatar
          </label>
          <div className="grid grid-cols-3 gap-4">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.src)}
                className={`
                  relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 transition-colors mx-auto
                  ${selectedAvatar === avatar.src 
                    ? 'border-[#FF8812] bg-[#FF8812]/5' 
                    : 'border-transparent hover:bg-[#362007]/10'
                  }
                `}
              >
                <img
                  src={avatar.src}
                  alt={avatar.label}
                  className="w-full h-full object-contain p-2"
                />
                {selectedAvatar === avatar.src && (
                  <div className="absolute inset-0 bg-[#FF8812]/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            New Password (optional)
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
            />
          </div>
        </div>

        {password && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8812]/20 focus:border-[#FF8812]"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};