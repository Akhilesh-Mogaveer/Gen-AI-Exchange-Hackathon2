import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName,
    dreamCareer: user?.dreamCareer
  });
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      fullName: user?.fullName,
      dreamCareer: user?.dreamCareer
    });
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full gradient-primary flex items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold text-white">
              {getInitials(user?.fullName)}
            </span>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 w-full md:w-auto">
          {!isEditing ? (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user?.fullName}</h1>
                  <p className="text-sm text-muted-foreground">@{user?.username}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                  iconSize={16}
                  className="self-start sm:self-auto"
                >
                  Edit Profile
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-foreground">Dream Career</span>
                </div>
                <p className="text-foreground font-medium">{user?.dreamCareer}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={editData?.fullName}
                  onChange={(e) => setEditData(prev => ({ ...prev, fullName: e?.target?.value }))}
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Dream Career"
                  type="text"
                  value={editData?.dreamCareer}
                  onChange={(e) => setEditData(prev => ({ ...prev, dreamCareer: e?.target?.value }))}
                  placeholder="Enter your dream career"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  loading={isLoading}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1 sm:flex-none"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  iconName="X"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;