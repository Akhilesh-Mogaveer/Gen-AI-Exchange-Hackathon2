import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountInformation = ({ user, onUpdateAccount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    email: user?.email,
    phone: user?.phone,
    location: user?.location
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateAccount(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      email: user?.email,
      phone: user?.phone,
      location: user?.location
    });
    setIsEditing(false);
  };

  const accountFields = [
    {
      key: 'email',
      label: 'Email Address',
      icon: 'Mail',
      type: 'email',
      placeholder: 'Enter your email address'
    },
    {
      key: 'phone',
      label: 'Phone Number',
      icon: 'Phone',
      type: 'tel',
      placeholder: 'Enter your phone number'
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'MapPin',
      type: 'text',
      placeholder: 'Enter your location'
    }
  ];

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="User" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Account Information</h2>
            <p className="text-sm text-muted-foreground">Manage your personal details</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        )}
      </div>
      {!isEditing ? (
        <div className="space-y-4">
          {accountFields?.map((field) => (
            <div key={field?.key} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background">
                <Icon name={field?.icon} size={16} color="var(--color-muted-foreground)" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{field?.label}</p>
                <p className="text-foreground">{user?.[field?.key] || 'Not provided'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {accountFields?.map((field) => (
              <Input
                key={field?.key}
                label={field?.label}
                type={field?.type}
                value={editData?.[field?.key]}
                onChange={(e) => setEditData(prev => ({ ...prev, [field?.key]: e?.target?.value }))}
                placeholder={field?.placeholder}
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
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
  );
};

export default AccountInformation;